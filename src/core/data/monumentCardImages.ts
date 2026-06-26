import { ImageSourcePropType } from 'react-native';

/** Bundled card/panorama images for monuments with local assets. */
export const MONUMENT_BUNDLED_CARD_IMAGES: Record<string, ImageSourcePropType> = {
  bibliotheca: require('../../../assets/Home/panorama/bobelatic-alex.png'),
  'abu-simbel': require('../../../assets/Home/panorama/abu-simple.png'),
  'giza-pyramids': require('../../../assets/Home/panorama/pyramids-giza.png'),
  karnak: require('../../../assets/Home/panorama/karnak.png'),
  gem: require('../../../assets/Home/panorama/GEM.png'),
};

/** Remote thumbnail URLs (Wikimedia Commons) for monument feed/detail cards. */
export const MONUMENT_THUMBNAIL_URLS: Record<string, string> = {
  'abu-abbas':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Abu_el-Abbas_al-Mursi_Mosque_-_Alexandria.jpg/800px-Abu_el-Abbas_al-Mursi_Mosque_-_Alexandria.jpg',
  'al-azhar':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Cairo_Azahar_Mosque_Ramadan.jpg/800px-Cairo_Azahar_Mosque_Ramadan.jpg',
  'muizz-street':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Muizz_Street_Cairo_Egypt.jpg/800px-Muizz_Street_Cairo_Egypt.jpg',
  'high-dam':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/AswanHighDam.jpg/800px-AswanHighDam.jpg',
  'baron-palace':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Baron_Empain_Palace.jpg/800px-Baron_Empain_Palace.jpg',
  'ben-ezra':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Ben_Ezra_Synagogue_Cairo.jpg/800px-Ben_Ezra_Synagogue_Cairo.jpg',
  'dahshur-bent':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Bent_pyramid_Dahshur.jpg/800px-Bent_pyramid_Dahshur.jpg',
  'black-desert':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Black_Desert_Egypt.jpg/800px-Black_Desert_Egypt.jpg',
  'blue-hole':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Blue_Hole_Dahab.jpg/800px-Blue_Hole_Dahab.jpg',
  'cairo-tower':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Cairo_Tower_2023.jpg/800px-Cairo_Tower_2023.jpg',
  catacombs:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Kom_el-Shoqafa.jpg/800px-Kom_el-Shoqafa.jpg',
  'abu-serga':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Abu_Serga_Church_-_Coptic_Cairo.jpg/800px-Abu_Serga_Church_-_Coptic_Cairo.jpg',
  qaitbay:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Qaitbay_Citadel_Alexandria.jpg/800px-Qaitbay_Citadel_Alexandria.jpg',
  'cleopatra-pool':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Cleopatra_Bath_Siwa.jpg/800px-Cleopatra_Bath_Siwa.jpg',
  'colossi-memnon':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Colossi_of_Memnon.jpg/800px-Colossi_of_Memnon.jpg',
  'coptic-museum':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Coptic_Museum_Cairo.jpg/800px-Coptic_Museum_Cairo.jpg',
  'crystal-mountain':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Crystal_Mountain_Egypt.jpg/800px-Crystal_Mountain_Egypt.jpg',
  'dahab-lagoon':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Dahab_Lagoon.jpg/800px-Dahab_Lagoon.jpg',
  dendera:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Dendera_Temple_complex.jpg/800px-Dendera_Temple_complex.jpg',
  'egyptian-museum':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Egyptian_Museum_Cairo.jpg/800px-Egyptian_Museum_Cairo.jpg',
  'el-gouna':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/El_Gouna_Marina.jpg/800px-El_Gouna_Marina.jpg',
  'gayer-anderson':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Gayer-Anderson_Museum_Cairo.jpg/800px-Gayer-Anderson_Museum_Cairo.jpg',
  'giftun-island':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Giftun_Island_Hurghada.jpg/800px-Giftun_Island_Hurghada.jpg',
  'great-sphinx':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Great_Sphinx_of_Giza_-_20080716a.jpg/800px-Great_Sphinx_of_Giza_-_20080716a.jpg',
  'hurghada-marina':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Hurghada_Marina.jpg/800px-Hurghada_Marina.jpg',
  'khan-el-khalili':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Khan_el-Khalili.jpg/800px-Khan_el-Khalili.jpg',
  'kom-ombo':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Kom_Ombo_Temple.jpg/800px-Kom_Ombo_Temple.jpg',
  'lake-qarun':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Lake_Qarun.jpg/800px-Lake_Qarun.jpg',
  'luxor-museum':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Luxor_Museum.jpg/800px-Luxor_Museum.jpg',
  'luxor-temple':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Luxor_Temple_Egypt.jpg/800px-Luxor_Temple_Egypt.jpg',
  'manial-palace':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Manial_Palace_Cairo.jpg/800px-Manial_Palace_Cairo.jpg',
  'medinet-habu':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Medinet_Habu%2C_Egypt.jpg/800px-Medinet_Habu%2C_Egypt.jpg',
  memphis:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/RamsesII-RedGranite-Statue_Memphis_Egypt.jpg/800px-RamsesII-RedGranite-Statue_Memphis_Egypt.jpg',
  'st-anthony':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Saint_Anthony%27s_Monastery_Egypt.jpg/800px-Saint_Anthony%27s_Monastery_Egypt.jpg',
  'st-paul':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Monastery_of_St_Paul_the_Hermit.jpg/800px-Monastery_of_St_Paul_the_Hermit.jpg',
  montaza:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Montaza_Palace_Alexandria.jpg/800px-Montaza_Palace_Alexandria.jpg',
  'ibn-tulun':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Mosque_of_Ibn_Tulun_Cairo.jpg/800px-Mosque_of_Ibn_Tulun_Cairo.jpg',
  'muhammad-ali-mosque':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Mosque_of_Muhammad_Ali_Cairo.jpg/800px-Mosque_of_Muhammad_Ali_Cairo.jpg',
  'sultan-hassan':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Madrassa_of_Sultan_Hassan_Cairo.jpg/800px-Madrassa_of_Sultan_Hassan_Cairo.jpg',
  'mount-sinai':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Mount_Sinai_from_st_catherines_monastery.jpg/800px-Mount_Sinai_from_st_catherines_monastery.jpg',
  'naama-bay':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Naama_Bay_Sharm.jpg/800px-Naama_Bay_Sharm.jpg',
  nmec: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/National_Museum_of_Egyptian_Civilization.jpg/800px-National_Museum_of_Egyptian_Civilization.jpg',
  'nubian-museum':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Nubian_Museum_Aswan.jpg/800px-Nubian_Museum_Aswan.jpg',
  philae:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Philae_Temple_Egypt.jpg/800px-Philae_Temple_Egypt.jpg',
  'pompey-pillar':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Pompey%27s_Pillar_Alexandria.jpg/800px-Pompey%27s_Pillar_Alexandria.jpg',
  'ras-muhammad':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Ras_Mohammed_National_Park.jpg/800px-Ras_Mohammed_National_Park.jpg',
  'roman-theatre':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Roman_Amphitheatre_Alexandria.jpg/800px-Roman_Amphitheatre_Alexandria.jpg',
  'st-catherine':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/St_Catherines_Monastery_Sinai.jpg/800px-St_Catherines_Monastery_Sinai.jpg',
  citadel:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cairo_Citadel_and_Mosque_of_Muhammad_Ali.jpg/800px-Cairo_Citadel_and_Mosque_of_Muhammad_Ali.jpg',
  shali:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Shali_fortress_Siwa.jpg/800px-Shali_fortress_Siwa.jpg',
  saqqara:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Saqqara_Step_Pyramid.jpg/800px-Saqqara_Step_Pyramid.jpg',
  'suez-canal':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Suez_Canal_Ship.jpg/800px-Suez_Canal_Ship.jpg',
  hatshepsut:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Deir_el-Bahari_Luxor.jpg/800px-Deir_el-Bahari_Luxor.jpg',
  edfu: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Edfu_Temple_Egypt.jpg/800px-Edfu_Temple_Egypt.jpg',
  'philae-kalabsha':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Temple_of_Kalabsha.jpg/800px-Temple_of_Kalabsha.jpg',
  esna: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Esna_Temple.jpg/800px-Esna_Temple.jpg',
  abydos:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Temple_of_Seti_I_Abydos.jpg/800px-Temple_of_Seti_I_Abydos.jpg',
  'siwa-oracle':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Temple_of_the_Oracle_Siwa.jpg/800px-Temple_of_the_Oracle_Siwa.jpg',
  'hanging-church':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Hanging_Church_Cairo.jpg/800px-Hanging_Church_Cairo.jpg',
  'tunis-village':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tunis_Village_Fayoum.jpg/800px-Tunis_Village_Fayoum.jpg',
  'unfinished-obelisk':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Unfinished_obelisk_Aswan.jpg/800px-Unfinished_obelisk_Aswan.jpg',
  'valley-kings':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Valley_of_the_kings.jpg/800px-Valley_of_the_kings.jpg',
  'valley-queens':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Valley_of_the_Queens.jpg/800px-Valley_of_the_Queens.jpg',
  'wadi-hitan':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Wadi_Al-Hitan.jpg/800px-Wadi_Al-Hitan.jpg',
  'wadi-rayan':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Wadi_El_Rayan.jpg/800px-Wadi_El_Rayan.jpg',
  'white-desert':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/White_Desert_Egypt.jpg/800px-White_Desert_Egypt.jpg',
};
