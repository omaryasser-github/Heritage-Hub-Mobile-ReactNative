import * as Font from 'expo-font';
import {
  LibreCaslonText_400Regular,
  LibreCaslonText_700Bold,
} from '@expo-google-fonts/libre-caslon-text';
import {
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
} from '@expo-google-fonts/work-sans';

export const FontFamily = {
  serif: 'LibreCaslonText_400Regular',
  serifBold: 'LibreCaslonText_700Bold',
  sans: 'WorkSans_400Regular',
  sansMedium: 'WorkSans_500Medium',
  sansSemiBold: 'WorkSans_600SemiBold',
  sansBold: 'WorkSans_700Bold',
} as const;

export async function loadAppFonts(): Promise<void> {
  await Font.loadAsync({
    [FontFamily.serif]: LibreCaslonText_400Regular,
    [FontFamily.serifBold]: LibreCaslonText_700Bold,
    [FontFamily.sans]: WorkSans_400Regular,
    [FontFamily.sansMedium]: WorkSans_500Medium,
    [FontFamily.sansSemiBold]: WorkSans_600SemiBold,
    [FontFamily.sansBold]: WorkSans_700Bold,
  });
}
