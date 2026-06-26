import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../shared/constants/colors';

const CATEGORY_ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  temple: 'business-outline',
  museum: 'library-outline',
  mosque: 'moon-outline',
  church: 'rose-outline',
  'ancient-monument': 'hourglass-outline',
  'historic-site': 'map-outline',
  attraction: 'star-outline',
  natural: 'leaf-outline',
  market: 'storefront-outline',
};

interface CategoryIconProps {
  categorySlug?: string;
  size: number;
  color?: string;
}

export const CategoryIcon = ({
  categorySlug,
  size,
  color = Colors.primaryDeep,
}: CategoryIconProps) => {
  const iconName = (categorySlug && CATEGORY_ICON_MAP[categorySlug]) || 'location-outline';

  return <Ionicons name={iconName} size={size} color={color} />;
};

export const getSectionIcon = (section: 'history' | 'culture'): keyof typeof Ionicons.glyphMap => {
  return section === 'history' ? 'library-outline' : 'color-palette-outline';
};
