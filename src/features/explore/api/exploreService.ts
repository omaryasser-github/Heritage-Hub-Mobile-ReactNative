export interface Monument {
  id: string;
  titleKey: string;
  locationKey: string;
  image_url: string;
  rating: number;
  isFavorite: boolean;
}

const MONUMENT_TEMPLATES = [
  {
    titleKey: 'home.monuments.pyramid',
    locationKey: 'home.locations.giza',
    image_url: 'https://images.unsplash.com/photo-1539667468225-eebb663053e6',
    rating: 4.8,
  },
  {
    titleKey: 'home.monuments.petra',
    locationKey: 'home.locations.petra',
    image_url: 'https://images.unsplash.com/photo-1542385151-efd9000785a0',
    rating: 4.9,
  },
  {
    titleKey: 'home.monuments.colosseum',
    locationKey: 'home.locations.rome',
    image_url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
    rating: 4.7,
  },
] as const;

const FAVORITE_PATTERN = [
  false,
  true,
  false,
  true,
  true,
  false,
  false,
  true,
  false,
  false,
  true,
  false,
  false,
  true,
  false,
  false,
  true,
  false,
  false,
  true,
  false,
  false,
  true,
  false,
  false,
  true,
  true,
];

export const exploreService = {
  getFeed: (): Monument[] => {
    return MONUMENT_TEMPLATES.flatMap((template, templateIndex) =>
      Array.from({ length: 9 }, (_, batchIndex) => {
        const index = templateIndex * 9 + batchIndex;
        return {
          id: String(index + 1),
          titleKey: template.titleKey,
          locationKey: template.locationKey,
          image_url: template.image_url,
          rating: template.rating,
          isFavorite: FAVORITE_PATTERN[index] ?? false,
        };
      })
    ).slice(0, 27);
  },
  searchMonuments: async (_query: string): Promise<Monument[]> => {
    return [];
  },
  toggleFavorite: async (_id: string): Promise<boolean> => {
    return true;
  },
};
