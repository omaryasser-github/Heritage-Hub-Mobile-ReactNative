import { ImageSourcePropType } from 'react-native';
import {
  FeedQuery,
  LandmarksDataset,
  LocalizedArticle,
  MonumentDetail,
  MonumentFeedItem,
  RawCity,
  RawMonument,
} from './types';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const dataset = require('./egypt-tourism-landmarks.json') as LandmarksDataset;

const RECOMMENDED_SLUGS = new Set([
  'giza-pyramids',
  'abu-simbel',
  'bibliotheca',
  'karnak',
  'luxor-temple',
  'great-sphinx',
  'citadel',
  'valley-kings',
]);

const MAJOR_CITY_SLUGS = new Set([
  'cairo',
  'giza',
  'luxor',
  'aswan',
  'alexandria',
  'sharm-el-sheikh',
  'hurghada',
]);

const CATEGORY_PLACEHOLDERS: Record<string, ImageSourcePropType> = {
  temple: require('../../../assets/Home/icons/temples.png'),
  museum: require('../../../assets/Home/icons/museums.png'),
  mosque: require('../../../assets/Home/icons/temples.png'),
  church: require('../../../assets/Home/icons/museums.png'),
  'ancient-monument': require('../../../assets/Home/card.png'),
  'historic-site': require('../../../assets/Home/card.png'),
  attraction: require('../../../assets/Home/icons/popular.png'),
  natural: require('../../../assets/Home/icons/cities.png'),
  market: require('../../../assets/Home/icons/recommend-icon.png'),
};

const DEFAULT_PLACEHOLDER = require('../../../assets/Home/card.png');

const cityByUuid = new Map(dataset.cities.map((city) => [city.uuid, city]));
const cityBySlug = new Map(dataset.cities.map((city) => [city.slug, city]));

const favoriteSlugs = new Set<string>();

function isArabic(language: string): boolean {
  return language.startsWith('ar');
}

function pickLocalized(en: string, ar: string, language: string): string {
  return isArabic(language) ? ar : en;
}

function resolveCity(monument: RawMonument): RawCity | undefined {
  return cityByUuid.get(monument.city_uuid) ?? cityBySlug.get(monument.city_slug);
}

function resolveImage(monument: RawMonument): ImageSourcePropType {
  if (monument.thumbnail_url?.trim()) {
    return { uri: monument.thumbnail_url };
  }
  const category = monument.category_slugs[0];
  return CATEGORY_PLACEHOLDERS[category] ?? DEFAULT_PLACEHOLDER;
}

function localizeArticles(
  articles: RawMonument['articles'],
  language: string
): MonumentDetail['articles'] {
  const history = articles?.history ?? [];
  const culture = articles?.culture ?? [];

  const mapArticle = (article: {
    id: string;
    title_en: string;
    title_ar: string;
    body_en: string;
    body_ar: string;
  }): LocalizedArticle => ({
    id: article.id,
    title: pickLocalized(article.title_en, article.title_ar, language),
    body: pickLocalized(article.body_en, article.body_ar, language),
  });

  return {
    history: history.map(mapArticle),
    culture: culture.map(mapArticle),
  };
}

function matchesSearch(monument: RawMonument, city: RawCity | undefined, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const haystack = [
    monument.name_en,
    monument.name_ar,
    monument.slug,
    city?.name_en,
    city?.name_ar,
    city?.governorate,
    city?.governorate_ar,
    ...monument.tags,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return haystack.includes(normalized);
}

function matchesCategoryFilter(monument: RawMonument, category?: FeedQuery['category']): boolean {
  if (!category || category === 'recommended') {
    if (category === 'recommended') {
      return RECOMMENDED_SLUGS.has(monument.slug);
    }
    return true;
  }

  if (category === 'popular') {
    return monument.tags.includes('must-visit') || monument.tags.includes('iconic');
  }

  if (category === 'cities') {
    return MAJOR_CITY_SLUGS.has(monument.city_slug);
  }

  if (category === 'museums') {
    return monument.category_slugs.includes('museum');
  }

  if (category === 'temples') {
    return monument.category_slugs.includes('temple');
  }

  return true;
}

function toFeedItem(monument: RawMonument, language: string): MonumentFeedItem {
  const city = resolveCity(monument);
  const cityName = city
    ? pickLocalized(city.name_en, city.name_ar, language)
    : monument.city_slug;
  const governorate = city
    ? pickLocalized(city.governorate, city.governorate_ar, language)
    : '';

  return {
    id: monument.uuid,
    slug: monument.slug,
    name: pickLocalized(monument.name_en, monument.name_ar, language),
    location: governorate ? `${cityName}, ${governorate}` : cityName,
    image: resolveImage(monument),
    rating: monument.rating,
    isFavorite: favoriteSlugs.has(monument.slug),
    categorySlugs: monument.category_slugs,
  };
}

function toDetail(monument: RawMonument, language: string): MonumentDetail {
  const city = resolveCity(monument);

  return {
    id: monument.uuid,
    slug: monument.slug,
    name: pickLocalized(monument.name_en, monument.name_ar, language),
    summary: pickLocalized(monument.description_en, monument.description_ar, language),
    city: city ? pickLocalized(city.name_en, city.name_ar, language) : monument.city_slug,
    governorate: city ? pickLocalized(city.governorate, city.governorate_ar, language) : '',
    image: resolveImage(monument),
    rating: monument.rating,
    entryFee: monument.entry_fee,
    openingHours: monument.opening_hours,
    categorySlugs: monument.category_slugs,
    isFavorite: favoriteSlugs.has(monument.slug),
    articles: localizeArticles(monument.articles, language),
  };
}

export const landmarksRepository = {
  getCategories: () => dataset.categories,
  getCities: () => dataset.cities,
  getMonuments: () => dataset.monuments,

  getMonumentBySlug: (slug: string, language: string): MonumentDetail | null => {
    const monument = dataset.monuments.find((item) => item.slug === slug);
    if (!monument) return null;
    return toDetail(monument, language);
  },

  getFeed: (query: FeedQuery, language: string): MonumentFeedItem[] => {
    return dataset.monuments
      .filter((monument) => {
        const city = resolveCity(monument);
        return (
          matchesCategoryFilter(monument, query.category) &&
          matchesSearch(monument, city, query.search ?? '')
        );
      })
      .map((monument) => toFeedItem(monument, language));
  },

  toggleFavorite: (slug: string): boolean => {
    if (favoriteSlugs.has(slug)) {
      favoriteSlugs.delete(slug);
      return false;
    }
    favoriteSlugs.add(slug);
    return true;
  },

  isFavorite: (slug: string): boolean => favoriteSlugs.has(slug),
};
