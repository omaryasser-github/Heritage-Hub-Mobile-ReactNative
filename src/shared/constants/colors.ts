/**
 * Design tokens aligned to planing/req-analysis/DESIGN.md (implemented UI palette).
 */
export const Colors = {
  // Primary gold scale
  primary: '#D9A941',
  primarySoft: '#E0C385',
  primaryDeep: '#8B6914',
  primaryMuted: '#C5A55A',
  primaryContainer: '#FFF0D6',
  primaryButton: 'rgba(217, 169, 65, 0.7)',
  primarySolid: '#D4AF37',
  primarySend: '#CCB27B',
  primarySelected: 'rgba(217, 169, 65, 0.1)',

  // Backgrounds
  backgroundHome: '#F2E8DD',
  backgroundApp: '#FDF6EC',
  backgroundTab: '#F4E8DA',
  backgroundSuggestion: '#F4E8DA',
  backgroundPlaceholder: '#FAFAFA',
  backgroundNeutral: '#F0F0F0',
  backgroundSearch: '#F2F2F7',

  // Surfaces
  surface: '#FFFFFF',
  surfaceMenu: '#FDF6EC',
  surfaceRating: '#FFF4E5',
  surfaceDark: '#000000',

  // Borders
  borderDivider: '#E8D5B5',
  borderDividerLight: '#F0E2C8',
  borderGlass: 'rgba(255, 255, 255, 0.3)',
  borderGlassSubtle: 'rgba(255, 255, 255, 0.2)',

  // Text
  textPrimary: '#4A3728',
  textSecondary: '#333333',
  textTitle: '#1A1A1A',
  textMuted: '#666666',
  textSubtle: '#8E8E93',
  textDisabled: '#B8A080',
  textQuizMuted: '#AAAAAA',
  textOnDark: '#FFFFFF',
  textOnDarkMuted: '#E0E0E0',
  textOnDarkAccent: '#D4C09A',
  textLink: '#D9A941',

  // Semantic
  error: '#FF6B6B',
  errorStrong: '#FF3B30',
  errorDestructive: '#D32F2F',
  rating: '#FF9500',

  // Overlays
  overlayAuth: 'rgba(0, 0, 0, 0.5)',
  overlayQuiz: 'rgba(0, 0, 0, 0.6)',
  overlaySplash: 'rgba(0, 0, 0, 0.4)',
  overlayDrawer: 'rgba(30, 18, 8, 0.45)',
  overlayModal: 'rgba(0, 0, 0, 0.5)',
  overlayGlass: 'rgba(255, 255, 255, 0.15)',
  overlayGlassButton: 'rgba(255, 255, 255, 0.1)',
  overlayProgressTrack: 'rgba(255, 255, 255, 0.2)',

  // Tab navigation
  tabActive: '#E0C385',
  tabInactive: '#8E8E93',
  tabBarBackground: '#F4E8DA',

  // Chat
  chatUserBubble: '#8B6914',
  chatBotBubble: '#FDF6EC',
  chatBotText: '#4A3728',
  chatUserText: '#FFFFFF',
  chatInputBackground: '#F2F2F2',
  chatAvatarHeader: '#E0C385',

  // Third-party / platform
  socialGoogle: '#DB4437',
  socialFacebook: '#4267B2',
  switchTrackOff: '#E0E0E0',
  switchThumbAndroid: '#F4F3F4',

  // Category pill (outlier — preserve until redesigned)
  categoryPillBg: '#E6F2FF',
  categoryPillText: '#007AFF',
  categoryPillLabel: '#333333',

  shadow: '#000000',
} as const;

export type ColorToken = keyof typeof Colors;
