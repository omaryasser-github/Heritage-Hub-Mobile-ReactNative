import i18n from '../../../core/i18n';
import { MonumentDetail } from '../../../core/data/types';
import { landmarksRepository } from '../../../core/data';

function currentLanguage(): string {
  return i18n.language ?? 'en';
}

export const monumentService = {
  getBySlug: (slug: string): MonumentDetail | null => {
    return landmarksRepository.getMonumentBySlug(slug, currentLanguage());
  },

  toggleFavorite: (slug: string): boolean => {
    return landmarksRepository.toggleFavorite(slug);
  },
};
