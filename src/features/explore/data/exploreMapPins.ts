/** Calibrated % positions on assets/Home/explore/egypt-map.jpg (illustrated map, not GIS). */
export interface ExploreMapPin {
  key: string;
  governorateEn: string;
  governorateAr: string;
  xPercent: number;
  yPercent: number;
}

export const EXPLORE_MAP_PINS: ExploreMapPin[] = [
  { key: 'alexandria', governorateEn: 'Alexandria', governorateAr: 'الإسكندرية', xPercent: 0.28, yPercent: 0.14 },
  { key: 'matrouh', governorateEn: 'Matrouh', governorateAr: 'مطروح', xPercent: 0.1, yPercent: 0.2 },
  { key: 'cairo', governorateEn: 'Cairo', governorateAr: 'القاهرة', xPercent: 0.46, yPercent: 0.2 },
  { key: 'giza', governorateEn: 'Giza', governorateAr: 'الجيزة', xPercent: 0.4, yPercent: 0.24 },
  { key: 'ismailia', governorateEn: 'Ismailia', governorateAr: 'الإسماعيلية', xPercent: 0.58, yPercent: 0.26 },
  { key: 'fayoum', governorateEn: 'Fayoum', governorateAr: 'الفيوم', xPercent: 0.32, yPercent: 0.3 },
  { key: 'new-valley', governorateEn: 'New Valley', governorateAr: 'الوادي الجديد', xPercent: 0.14, yPercent: 0.32 },
  { key: 'red-sea', governorateEn: 'Red Sea', governorateAr: 'البحر الأحمر', xPercent: 0.72, yPercent: 0.38 },
  { key: 'south-sinai', governorateEn: 'South Sinai', governorateAr: 'جنوب سيناء', xPercent: 0.85, yPercent: 0.45 },
  { key: 'luxor', governorateEn: 'Luxor', governorateAr: 'الأقصر', xPercent: 0.46, yPercent: 0.5 },
  { key: 'qena', governorateEn: 'Qena', governorateAr: 'قنا', xPercent: 0.44, yPercent: 0.56 },
  { key: 'sohag', governorateEn: 'Sohag', governorateAr: 'سوهاج', xPercent: 0.42, yPercent: 0.6 },
  { key: 'aswan', governorateEn: 'Aswan', governorateAr: 'أسوان', xPercent: 0.4, yPercent: 0.72 },
];

export function getExploreMapPinLabel(pin: ExploreMapPin, language: string): string {
  return language.startsWith('ar') ? pin.governorateAr : pin.governorateEn;
}

export function findExploreMapPin(key: string): ExploreMapPin | undefined {
  return EXPLORE_MAP_PINS.find((pin) => pin.key === key);
}
