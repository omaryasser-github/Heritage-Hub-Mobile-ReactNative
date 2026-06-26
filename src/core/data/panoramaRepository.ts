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
const GIZA_PYRAMIDS_TEXTURE = require('../../../assets/Home/panorama/pyramids-giza.png');
const KARNAK_TEXTURE = require('../../../assets/Home/panorama/karnak.png');
const GEM_TEXTURE = require('../../../assets/Home/panorama/GEM.png');

const PANORAMA_TEXTURES: Record<string, ImageSourcePropType> = {
  bibliotheca: BIBLIOTHECA_TEXTURE,
  'abu-simbel': ABU_SIMBEL_TEXTURE,
  'giza-pyramids': GIZA_PYRAMIDS_TEXTURE,
  karnak: KARNAK_TEXTURE,
  gem: GEM_TEXTURE,
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
  {
    panorama_id: 'panorama-giza-plateau',
    monument_slug: 'giza-pyramids',
    texture_asset: 'pyramids-giza.png',
    view_config: {
      defaultYaw: 0,
      defaultPitch: -4,
      cameraFov: 75,
    },
    hotspots: [
      {
        id: 'gp-great-sphinx',
        pitch: -4,
        yaw: -22,
        title_en: 'Great Sphinx of Giza',
        title_ar: 'تمثال أبو الهول',
        content_en:
          'The limestone Sphinx combines a lion’s body with a human head—traditionally linked to Pharaoh Khafre—and has guarded the plateau for more than 4,500 years.',
        content_ar:
          'يجمع أبو الهول من الحجر الجيري بين جسم أسد ورأس إنسان—يرتبط تقليديًا بالفرعون خفرع—ويحرس الهضبة منذ أكثر من 4500 عام.',
      },
      {
        id: 'gp-pyramid-khafre',
        pitch: 10,
        yaw: 32,
        title_en: 'Pyramid of Khafre',
        title_ar: 'هرم خفرع',
        content_en:
          'The central pyramid on the right still retains casing stones near its peak and appears taller because it stands on higher bedrock than the Great Pyramid.',
        content_ar:
          'لا يزال الهرم الأوسط على اليمين يحتفظ بحجارة التكسية قرب قمته ويبدو أطول لأنه يقف على صخر أعلى من الهرم الأكبر.',
      },
      {
        id: 'gp-pyramid-khufu',
        pitch: 12,
        yaw: -34,
        title_en: 'Great Pyramid of Khufu',
        title_ar: 'الهرم الأكبر لخوفو',
        content_en:
          'Built for Pharaoh Khufu around 2560 BC, it was the tallest man-made structure on Earth for nearly 4,000 years and remains the largest of the Giza trio.',
        content_ar:
          'بُني للفرعون خوفو حوالي 2560 قبل الميلاد، وكان أطول بناء من صنع الإنسان على الأرض لما يقرب من 4000 عام ولا يزال الأكبر بين ثلاثية الجيزة.',
      },
      {
        id: 'gp-valley-temple-ruins',
        pitch: -16,
        yaw: -6,
        title_en: 'Valley Temple Ruins',
        title_ar: 'أطلال معبد الوادي',
        content_en:
          'Massive limestone blocks in the foreground belong to mortuary temple foundations that once linked the Sphinx to Khafre’s pyramid complex.',
        content_ar:
          'تنتمي كتل الحجر الجيري الضخمة في المقدمة إلى أسس المعابد الجنائزية التي ربطت أبو الهول بمجمع هرم خفرع.',
      },
      {
        id: 'gp-causeway',
        pitch: -10,
        yaw: 18,
        title_en: 'Processional Causeway',
        title_ar: 'طريق المواكب',
        content_en:
          'The paved route climbing toward the pyramids follows the ancient causeway used for royal funeral processions and modern visitor access.',
        content_ar:
          'يتبع المسار المعبد الصاعد نحو الأهرامات الطريق القديم الذي استُخدم في مواكب الجنائز الملكية ووصول الزوار اليوم.',
      },
    ],
  },
  {
    panorama_id: 'panorama-karnak-avenue',
    monument_slug: 'karnak',
    texture_asset: 'karnak.png',
    view_config: {
      defaultYaw: 0,
      defaultPitch: -3,
      cameraFov: 75,
    },
    hotspots: [
      {
        id: 'ka-first-pylon',
        pitch: 14,
        yaw: 0,
        title_en: 'First Pylon',
        title_ar: 'البرج الأول',
        content_en:
          'The twin towers of the First Pylon mark Karnak’s main entrance—massive gateways that screened the sacred precinct from the outside world.',
        content_ar:
          'يحد البرجان التوأمان للبوابة الأولى المدخل الرئيسي للكرنك—بوابات ضخمة فصلت الحرم المقدس عن العالم الخارجي.',
      },
      {
        id: 'ka-ram-sphinx-avenue',
        pitch: -6,
        yaw: 0,
        title_en: 'Avenue of Ram Sphinxes',
        title_ar: 'ممر تماثيل الكبش',
        content_en:
          'Rows of ram-headed sphinxes line the ceremonial way, each protecting a small figure of the god Amun between its paws.',
        content_ar:
          'صفوف من تماثيل أبو الهول برؤوس الكبش تصطف على الطريق الطقسي، وكل منها يحمي تمثالًا صغيرًا للإله آمون بين مخالبها.',
      },
      {
        id: 'ka-right-sphinx-row',
        pitch: -8,
        yaw: 28,
        title_en: 'Illuminated Sphinx Row',
        title_ar: 'صف التماثيل المضاء',
        content_en:
          'The eastern row of criosphinxes is dramatically lit at dusk, revealing centuries of weathered sandstone carving.',
        content_ar:
          'يُضاء صف التماثيل الشرقي عند الغسق بشكل درامي، كاشفًا عن قرون من النحت على الحجر الرملي المتآكل.',
      },
      {
        id: 'ka-left-sphinx-row',
        pitch: -8,
        yaw: -28,
        title_en: 'Western Sphinx Guardians',
        title_ar: 'حراس التماثيل الغربية',
        content_en:
          'Mirroring sphinxes on the west side once guided processions from the Nile quay toward the temple of Amun-Ra.',
        content_ar:
          'تماثيل متناظرة على الجانب الغربي كانت توجه المواكب من رصيف النيل نحو معبد آمون رع.',
      },
      {
        id: 'ka-processional-way',
        pitch: -14,
        yaw: 0,
        title_en: 'Processional Way',
        title_ar: 'طريق المواكب',
        content_en:
          'The central paved path rises between the sphinx avenues toward the gateway—still walked by pilgrims and festivals for millennia.',
        content_ar:
          'يرتفع المسار المرصوف المركزي بين صفوف التماثيل نحو البوابة—ما زال يُطأى في الحج والاحتفالات منذ آلاف السنين.',
      },
    ],
  },
  {
    panorama_id: 'panorama-gem-atrium',
    monument_slug: 'gem',
    texture_asset: 'GEM.png',
    view_config: {
      defaultYaw: 0,
      defaultPitch: -4,
      cameraFov: 75,
    },
    hotspots: [
      {
        id: 'gem-ramesses-colossus',
        pitch: -2,
        yaw: 0,
        title_en: 'Colossus of Ramesses II',
        title_ar: 'تمثال رمسيس الثاني الضخم',
        content_en:
          'An 83-ton statue of Ramesses II stands at the heart of the Grand Egyptian Museum atrium—the same royal figure that once greeted visitors in Cairo’s Tahrir Square.',
        content_ar:
          'يقف تمثال وزنه 83 طناً للفرعون رمسيس الثاني في قلب ردهة المتحف المصري الكبير — نفس التمثال الملكي الذي كان يرحّب بالزوار في ميدان التحرير بالقاهرة.',
      },
      {
        id: 'gem-faceted-ceiling',
        pitch: 24,
        yaw: 0,
        title_en: 'Geometric Glass Ceiling',
        title_ar: 'السقف الزجاجي الهندسي',
        content_en:
          'Triangular skylight panels flood the atrium with filtered daylight, blending ancient sculpture with contemporary museum architecture.',
        content_ar:
          'تغمر ألواح الإضاءة المثلثة الردهة بضوء النهار المصفّى، ممزجةً بين النحت القديم وعمارة المتحف المعاصرة.',
      },
      {
        id: 'gem-reflecting-pool',
        pitch: -18,
        yaw: 0,
        title_en: 'Reflecting Pool',
        title_ar: 'البحيرة العاكسة',
        content_en:
          'A shallow pool at the statue’s base mirrors the colossus and ceiling geometry, emphasizing the monument’s scale for arriving visitors.',
        content_ar:
          'تعكس بحيرة ضحلة عند قاعدة التمثال التمثال الضخم وهندسة السقف، مؤكدةً حجم الآثار لدى الزوار الوافدين.',
      },
      {
        id: 'gem-glass-galleries',
        pitch: 2,
        yaw: 32,
        title_en: 'Glass Galleries',
        title_ar: 'المعارض الزجاجية',
        content_en:
          'Multi-level glass-walled galleries line the atrium, previewing the vast collections of Tutankhamun and Egypt’s greatest treasures inside.',
        content_ar:
          'تصطف معارض زجاجية متعددة الطوابق على الردهة، معاينةً المجموعات الشاسعة لتوت عنخ آمون وأعظم كنوز مصر في الداخل.',
      },
      {
        id: 'gem-grand-staircase',
        pitch: 4,
        yaw: -30,
        title_en: 'Grand Staircase',
        title_ar: 'السلم الكبير',
        content_en:
          'The main staircase rises beside the atrium, guiding visitors toward exhibition halls dedicated to Egypt’s complete archaeological story.',
        content_ar:
          'يرتفع السلم الرئيسي بجوار الردهة، موجهاً الزوار نحو قاعات العرض المخصصة للقصة الأثرية الكاملة لمصر.',
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
