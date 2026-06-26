import i18n from '../../../core/i18n';
import { PanoramaDetail } from '../../../core/data/types';
import { panoramaRepository } from '../../../core/data';

function currentLanguage(): string {
  return i18n.language ?? 'en';
}

export const panoramaService = {
  hasPanorama: (slug: string): boolean => {
    return panoramaRepository.hasPanorama(slug);
  },

  getBySlug: (slug: string): PanoramaDetail | null => {
    return panoramaRepository.getPanoramaBySlug(slug, currentLanguage());
  },
};
