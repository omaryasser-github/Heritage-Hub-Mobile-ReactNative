import i18n from '../../../core/i18n';
import { FeedQuery, MonumentFeedItem } from '../../../core/data/types';
import { landmarksRepository } from '../../../core/data';

export type Monument = MonumentFeedItem;

function currentLanguage(): string {
  return i18n.language ?? 'en';
}

export const exploreService = {
  getFeed: (query: FeedQuery = {}): MonumentFeedItem[] => {
    return landmarksRepository.getFeed(query, currentLanguage());
  },

  searchMonuments: async (query: string): Promise<MonumentFeedItem[]> => {
    return landmarksRepository.getFeed({ search: query }, currentLanguage());
  },

  toggleFavorite: async (slug: string): Promise<boolean> => {
    return landmarksRepository.toggleFavorite(slug);
  },
};
