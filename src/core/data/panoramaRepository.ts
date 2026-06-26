import { ImageSourcePropType } from 'react-native';
import { LocalizedPanoramaHotspot, PanoramaDetail, RawPanorama, RawPanoramaHotspot } from './types';

const BIBLIOTHECA_TEXTURE = require('../../../assets/Home/panorama/bobelatic-alex.png');

const PANORAMA_TEXTURES: Record<string, ImageSourcePropType> = {
  bibliotheca: BIBLIOTHECA_TEXTURE,
};

const SEED_PANORAMAS: RawPanorama[] = [
  {
    panorama_id: 'panorama-bibliotheca-spike',
    monument_slug: 'bibliotheca',
    texture_asset: 'bobelatic-alex.png',
    hotspots: [
      {
        id: 'ba-reading-hall',
        pitch: -5,
        yaw: 0,
        title_en: 'Main Reading Hall',
        title_ar: 'قاعة القراءة الرئيسية',
        content_en:
          'The terraced reading hall seats hundreds of visitors beneath the library’s iconic slanted glass roof.',
        content_ar:
          'تتسع قاعة القراءة المتدرجة لمئات الزوار تحت السقف الزجاجي المائل الشهير للمكتبة.',
      },
      {
        id: 'ba-skylight-ceiling',
        pitch: 22,
        yaw: -12,
        title_en: 'Skylight Grid',
        title_ar: 'شبكة الإضاءة الطبيعية',
        content_en:
          'Triangular skylights flood the interior with daylight while geometric concrete beams carry the structure.',
        content_ar:
          'تغمر المثلثات الزجاجية الداخل بالضوء الطبيعي بينما تحمل العوارض الخرسانية الهندسية الهيكل.',
      },
      {
        id: 'ba-terrace-walkway',
        pitch: -2,
        yaw: 28,
        title_en: 'Curved Walkway',
        title_ar: 'الممر المنحني',
        content_en:
          'An elevated walkway with glass railings connects upper levels around the hall.',
        content_ar: 'يربط ممر مرتفع ذو درابزين زجاجي بين المستويات العليا حول القاعة.',
      },
    ],
  },
];

function pickLocalized(en: string, ar: string, language: string): string {
  return language.startsWith('ar') ? ar : en;
}

function localizeHotspots(
  hotspots: RawPanoramaHotspot[],
  language: string
): LocalizedPanoramaHotspot[] {
  return hotspots.map((hotspot) => ({
    id: hotspot.id,
    pitch: hotspot.pitch,
    yaw: hotspot.yaw,
    title: pickLocalized(hotspot.title_en, hotspot.title_ar, language),
    content: pickLocalized(hotspot.content_en, hotspot.content_ar, language),
  }));
}

function toDetail(panorama: RawPanorama, language: string): PanoramaDetail {
  const texture = PANORAMA_TEXTURES[panorama.monument_slug];
  if (!texture) {
    throw new Error(`Missing bundled texture for panorama: ${panorama.monument_slug}`);
  }

  return {
    panoramaId: panorama.panorama_id,
    monumentSlug: panorama.monument_slug,
    texture,
    projection: 'partial',
    hotspots: localizeHotspots(panorama.hotspots, language),
  };
}

export const panoramaRepository = {
  hasPanorama: (slug: string): boolean => {
    return SEED_PANORAMAS.some((item) => item.monument_slug === slug);
  },

  getPanoramaBySlug: (slug: string, language: string): PanoramaDetail | null => {
    const panorama = SEED_PANORAMAS.find((item) => item.monument_slug === slug);
    if (!panorama) return null;
    return toDetail(panorama, language);
  },
};
