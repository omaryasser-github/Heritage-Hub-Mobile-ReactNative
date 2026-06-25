import { FontFamily } from '../../core/fonts/loadFonts';

export const TypographyConstants = {
  fontFamilies: FontFamily,
  styles: {
    headlineLg: {
      fontFamily: FontFamily.serifBold,
      fontSize: 32,
      lineHeight: 40,
    },
    headlineLgMobile: {
      fontFamily: FontFamily.serifBold,
      fontSize: 26,
      lineHeight: 32,
    },
    headlineMd: {
      fontFamily: FontFamily.serif,
      fontSize: 24,
      lineHeight: 30,
    },
    headlineSm: {
      fontFamily: FontFamily.serif,
      fontSize: 20,
      lineHeight: 26,
    },
    bodyLg: {
      fontFamily: FontFamily.sans,
      fontSize: 18,
      lineHeight: 28,
    },
    bodyMd: {
      fontFamily: FontFamily.sans,
      fontSize: 16,
      lineHeight: 24,
    },
    labelLg: {
      fontFamily: FontFamily.sansSemiBold,
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.05,
    },
    labelSm: {
      fontFamily: FontFamily.sansMedium,
      fontSize: 12,
      lineHeight: 16,
    },
  },
} as const;

export type TypographyVariant = keyof typeof TypographyConstants.styles;

/** @deprecated Use headlineLg, headlineMd, bodyMd, labelSm instead */
export const TypographyLegacyAliases = {
  h1: 'headlineLg',
  h2: 'headlineMd',
  body: 'bodyMd',
  caption: 'labelSm',
} as const satisfies Record<string, TypographyVariant>;

export type TypographyLegacyVariant = keyof typeof TypographyLegacyAliases;

export function resolveTypographyVariant(
  variant: TypographyVariant | TypographyLegacyVariant
): TypographyVariant {
  if (variant in TypographyLegacyAliases) {
    return TypographyLegacyAliases[variant as TypographyLegacyVariant];
  }
  return variant as TypographyVariant;
}
