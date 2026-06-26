import { ImageSourcePropType } from 'react-native';

export interface MonumentArticle {
  id: string;
  title_en: string;
  title_ar: string;
  body_en: string;
  body_ar: string;
}

export interface MonumentArticles {
  history: MonumentArticle[];
  culture: MonumentArticle[];
}

export interface RawMonument {
  uuid: string;
  slug: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  subcategory: string;
  latitude: number;
  longitude: number;
  thumbnail_url: string;
  rating: number | null;
  entry_fee: string;
  opening_hours: string;
  tags: string[];
  city_uuid: string;
  city_slug: string;
  category_uuids: string[];
  category_slugs: string[];
  articles?: MonumentArticles;
}

export interface RawCity {
  uuid: string;
  slug: string;
  name_en: string;
  name_ar: string;
  governorate: string;
  governorate_ar: string;
  latitude: number;
  longitude: number;
}

export interface RawCategory {
  uuid: string;
  slug: string;
  name_en: string;
  name_ar: string;
}

export interface LandmarksDataset {
  categories: RawCategory[];
  cities: RawCity[];
  monuments: RawMonument[];
}

export interface LocalizedArticle {
  id: string;
  title: string;
  body: string;
}

export interface MonumentFeedItem {
  id: string;
  slug: string;
  name: string;
  location: string;
  image: ImageSourcePropType;
  rating: number | null;
  isFavorite: boolean;
  categorySlugs: string[];
}

export interface MonumentDetail {
  id: string;
  slug: string;
  name: string;
  summary: string;
  city: string;
  governorate: string;
  image: ImageSourcePropType;
  rating: number | null;
  entryFee: string;
  openingHours: string;
  categorySlugs: string[];
  isFavorite: boolean;
  articles: {
    history: LocalizedArticle[];
    culture: LocalizedArticle[];
  };
}

export type HomeCategoryFilter =
  | 'recommended'
  | 'popular'
  | 'cities'
  | 'museums'
  | 'temples';

export interface FeedQuery {
  category?: HomeCategoryFilter;
  search?: string;
}
