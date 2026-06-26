import { ImageSourcePropType } from 'react-native';
import {
  LocalizedPanoramaHotspot,
  PanoramaDetail,
  PanoramaViewConfig,
  RawPanorama,
  RawPanoramaHotspot,
} from './types';

const BIBLIOTHECA_TEXTURE = require('../../../assets/Home/panorama/bobelatic-alex.png');
const ABU_SIMBEL_TEXTURE = require('../../../assets/Home/panorama/abu-simple.png');

const PANORAMA_TEXTURES: Record<string, ImageSourcePropType> = {
  bibliotheca: BIBLIOTHECA_TEXTURE,
  'abu-simbel': ABU_SIMBEL_TEXTURE,
};

const SEED_PANORAMAS: RawPanorama[] = [
  {
    panorama_id: 'panorama-bibliotheca-spike',
    monument_slug: 'bibliotheca',
    texture_asset: 'bobelatic-alex.png',
    view_config: {
      defaultYaw: 0,
      defaultPitch: -5,
      cameraFov: 75,
    },
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
  {
    panorama_id: 'panorama-abu-simbel-facade',
    monument_slug: 'abu-simbel',
    texture_asset: 'abu-simple.png',
    view_config: {
      defaultYaw: 0,
      defaultPitch: -4,
      cameraFov: 75,
    },
    hotspots: [
      {
        id: 'as-main-entrance',
        pitch: -6,
        yaw: 0,
        title_en: 'Temple Entrance',
        title_ar: 'مدخل المعبد',
        content_en:
          'The central doorway leads into the Great Temple of Ramesses II, aligned so sunlight reaches the inner sanctuary on February 22 and October 22 each year.',
        content_ar:
          'يؤدي المدخل المركزي إلى المعبد الكبير لرمسيس الثاني، وقد صُمم ليصل ضوء الشمس إلى الحجرة الداخلية في 22 فبراير و22 أكتوبر من كل عام.',
      },
      {
        id: 'as-fallen-colossus',
        pitch: 4,
        yaw: -22,
        title_en: 'The Fallen Colossus',
        title_ar: 'التمثال المنكسر',
        content_en:
          'The second colossus from the left lost its head and upper torso—likely from an ancient earthquake—leaving massive fragments at the base.',
        content_ar:
          'فقد التمثال الثاني من اليسار رأسه وصدره العلوي—على الأرجح بسبب زلزال قديم—لتبقى قطع ضخمة عند القاعدة.',
      },
      {
        id: 'as-ra-horakhty',
        pitch: 18,
        yaw: 0,
        title_en: 'Ra-Horakhty Niche',
        title_ar: 'حرم رع حوراختي',
        content_en:
          'Above the doorway, the falcon-headed sun god Ra-Horakhty stands in a niche, linking the pharaoh’s power to the solar cult.',
        content_ar:
          'فوق المدخل يقف إله الشمس رع حوراختي برأس الصقر في حرم، رابطًا قوة الفرعون بطقوس الشمس.',
      },
      {
        id: 'as-left-colossus',
        pitch: 2,
        yaw: -38,
        title_en: 'Colossus of Ramesses II',
        title_ar: 'تمثال رمسيس الثاني',
        content_en:
          'The intact seated figure on the left wears the double crown of Upper and Lower Egypt, each statue rising about 20 meters high.',
        content_ar:
          'التمثال الجالس السليم على اليسار يرتدي التاج المزدوج لمصر العليا والسفلى، ويبلغ ارتفاع كل تمثال نحو 20 مترًا.',
      },
      {
        id: 'as-baboon-frieze',
        pitch: 26,
        yaw: 2,
        title_en: 'Baboon Frieze',
        title_ar: 'نُسق القردة',
        content_en:
          'Along the top of the facade, a row of baboons raises its paws toward the rising sun—a symbol of dawn worship at Abu Simbel.',
        content_ar:
          'على طول أعلى الواجهة، صف من القردة يرفع أيديه نحو شروق الشمس—رمز لعبادة الفجر في أبو سمبل.',
      },
      {
        id: 'as-hieroglyph-pedestal',
        pitch: -16,
        yaw: -8,
        title_en: 'Hieroglyphic Pedestal',
        title_ar: 'قاعدة الهيروغليفية',
        content_en:
          'The throne bases are carved with hieroglyphs and scenes of bound captives, proclaiming Ramesses II’s military victories.',
        content_ar:
          'قواعد العرش منحوتة بالهيروغليفية ومشاهد للأسرى المقيدين، إعلانًا بانتصارات رمسيس الثاني العسكرية.',
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
    projection: 'equirectangular',
    viewConfig: panorama.view_config,
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
