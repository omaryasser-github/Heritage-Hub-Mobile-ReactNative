# Phase 11.1: Design System Refactor

This phase focuses on refactoring the styling system of the Heritage Hub application, introducing design token constants (colors, typography, and spacing spacing matching DESIGN.md), migrating existing shared components, styling navigation tab bars, building a 3-language selector, and writing comprehensive responsive utility tests.

## Folder Structure
The following files and folders will be added or updated during this phase:

```text
src/
├── features/
│   └── profile/
│       └── components/
│           └── LanguageSelector.tsx   # Custom modal/sheet for 3-language picker
├── shared/
│   ├── constants/
│   │   ├── colors.ts                  # HSL-aligned color palette tokens
│   │   ├── spacing.ts                 # Margin, padding, and layout border radii
│   │   └── typography.ts              # Libre Caslon / Work Sans styling mappings
│   └── utils/
│       └── responsive.test.ts         # Jest scaling utility unit tests
```

---

## Flow
1. **Design Token Reference**:
   - Shared atomic components (`Typography`, `PrimaryButton`) import design tokens directly.
   - Screen-level wrappers and custom selectors retrieve styles from theme constants.
2. **Navigation Tab rendering**:
   - `BottomTabNavigator` styles active/inactive states using centralized theme colors.
3. **Settings Screen Language Selection**:
   - The user opens `SettingsScreen` and clicks the "Language" preferences row.
   - The screen presents the `LanguageSelector` component (modal selection).
   - Selection updates the preferred locale. During this update, interactions are disabled to prevent duplicate triggers.
   - If the new language requires an RTL layout change (e.g., switching to Arabic), the application automatically restarts. Otherwise, translations update instantly.

---

## States
* **Layout Transition Loading**: Indicates when a language change is writing state to storage and triggering an app reload.
* **Component Variations**: Buttons and typography correctly render custom variants (e.g., primary outline vs filled, headline vs body).

---

## Logic

### 1. Style Constants (`src/shared/constants/`)
Implements the design tokens detailed in `DESIGN.md`:

* **Colors (`colors.ts`)**:
  ```typescript
  export const Colors = {
    primary: '#785a09', // Egyptian Gold
    primaryGradient: ['#D4AF37', '#B8860B'] as const,
    secondary: '#74584a', // Burnt Umber
    background: '#FCF9F8', // Papyrus Background
    surface: '#FCFAED', // Cream Card surface
    surfaceBorder: '#E5D9B6', // Card Outline
    textPrimary: '#1B1C1C',
    textSecondary: '#2D2D2D',
    textMuted: '#7F7666',
    error: '#BA1A1A',
    success: '#2E7D32',
    warning: '#ED6C02',
    info: '#0288D1',
    outline: '#7F7666',
    outlineVariant: '#D1C5B2',
    shadowColor: 'rgba(78, 54, 41, 0.08)',
  } as const;
  ```

* **Typography (`typography.ts`)**:
  ```typescript
  export const TypographyConstants = {
    fontFamilies: {
      serif: 'LibreCaslonText-Regular',
      serifBold: 'LibreCaslonText-Bold',
      sans: 'WorkSans-Regular',
      sansMedium: 'WorkSans-Medium',
      sansSemiBold: 'WorkSans-SemiBold',
      sansBold: 'WorkSans-Bold',
    },
    styles: {
      headlineLg: {
        fontFamily: 'LibreCaslonText-Bold',
        fontSize: 32,
        lineHeight: 40,
      },
      headlineLgMobile: {
        fontFamily: 'LibreCaslonText-Bold',
        fontSize: 26,
        lineHeight: 32,
      },
      headlineMd: {
        fontFamily: 'LibreCaslonText-Regular',
        fontSize: 24,
        lineHeight: 30,
      },
      headlineSm: {
        fontFamily: 'LibreCaslonText-Regular',
        fontSize: 20,
        lineHeight: 26,
      },
      bodyLg: {
        fontFamily: 'WorkSans-Regular',
        fontSize: 18,
        lineHeight: 28,
      },
      bodyMd: {
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        lineHeight: 24,
      },
      labelLg: {
        fontFamily: 'WorkSans-SemiBold',
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.05,
      },
      labelSm: {
        fontFamily: 'WorkSans-Medium',
        fontSize: 12,
        lineHeight: 16,
      },
    },
  } as const;
  ```

* **Spacing (`spacing.ts`)**:
  ```typescript
  export const Spacing = {
    screenPadding: 20,
    gutter: 16,
    stackSm: 8,
    stackMd: 16,
    stackLg: 32,
    borderRadius: {
      sm: 4,
      default: 8,
      md: 12,
      lg: 16,
      xl: 24,
      full: 9999,
    },
  } as const;
  ```

---

## Components

### 1. Reusable Typography component (`src/shared/components/Typography.tsx`)
Replaces hardcoded fonts with central theme tokens, scaling dynamically using `useResponsive`:
```typescript
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useResponsive } from '../utils/responsive';
import { Colors } from '../constants/colors';
import { TypographyConstants } from '../constants/typography';

interface TypographyProps extends TextProps {
  variant?: keyof typeof TypographyConstants.styles;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'bodyMd',
  color = Colors.textSecondary,
  align = 'auto',
  style,
  children,
  ...props
}) => {
  const { sFont } = useResponsive();
  const baseStyle = TypographyConstants.styles[variant];

  return (
    <Text
      style={[
        {
          fontFamily: baseStyle.fontFamily,
          fontSize: sFont(baseStyle.fontSize),
          lineHeight: sFont(baseStyle.lineHeight),
          letterSpacing: 'letterSpacing' in baseStyle ? baseStyle.letterSpacing : undefined,
          color,
          textAlign: align,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
```

### 2. Language Selector Modal (`src/features/profile/components/LanguageSelector.tsx`)
Displays a 3-option modal list to toggle between English, Arabic, and French:
```typescript
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Typography } from '../../../shared/components/Typography';
import { Colors } from '../../../shared/constants/colors';
import { Spacing } from '../../../shared/constants/spacing';
import { useLanguage } from '../../../shared/hooks/useLanguage';
import { AppLanguage } from '../../../core/i18n/languages';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ visible, onClose }) => {
  const { currentLanguage, changeLanguage, supportedLanguages } = useLanguage();

  const handleSelectLanguage = async (lang: AppLanguage) => {
    onClose();
    await changeLanguage(lang);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Typography variant="headlineSm" color={Colors.secondary} style={styles.title}>
            Select Language / اختر اللغة
          </Typography>
          
          {(Object.keys(supportedLanguages) as AppLanguage[]).map((key) => {
            const isSelected = currentLanguage === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.optionRow, isSelected && styles.selectedOption]}
                onPress={() => handleSelectLanguage(key)}
              >
                <Typography variant="bodyLg" color={isSelected ? Colors.primary : Colors.textPrimary}>
                  {supportedLanguages[key].nativeLabel} ({supportedLanguages[key].label})
                </Typography>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(116, 88, 74, 0.4)', // Uses secondary color with 40% transparency
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.screenPadding,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.gutter,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  title: {
    marginBottom: Spacing.stackMd,
    textAlign: 'center',
  },
  optionRow: {
    paddingVertical: Spacing.stackMd,
    paddingHorizontal: Spacing.gutter,
    borderRadius: Spacing.borderRadius.default,
    marginBottom: Spacing.stackSm,
  },
  selectedOption: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
});
```

---

## API
* **No network integration required for visual styling changes.**

---

## Testing

### Responsive Utilities Unit Tests (`src/shared/utils/responsive.test.ts`)
Strengthen calculations validation by mocking different layout dimensions:
```typescript
import { Dimensions } from 'react-native';
import { scaleWidth, scaleHeight, scaleFont } from './responsive';

describe('Responsive Layout Scaling', () => {
  const originalDimensions = Dimensions.get('window');

  afterEach(() => {
    // Reset layout sizes
    Dimensions.set({ window: originalDimensions, screen: originalDimensions });
  });

  it('calculates 1:1 values on standard baseline dimensions (375x812)', () => {
    Dimensions.set({
      window: { width: 375, height: 812, scale: 1, fontScale: 1 },
      screen: { width: 375, height: 812, scale: 1, fontScale: 1 },
    });

    expect(scaleWidth(100)).toBeCloseTo(100, 0);
    expect(scaleHeight(100)).toBeCloseTo(100, 0);
    expect(scaleFont(16)).toBeCloseTo(16, 0);
  });

  it('scales values proportionally on larger screens', () => {
    Dimensions.set({
      window: { width: 750, height: 1624, scale: 2, fontScale: 1 },
      screen: { width: 750, height: 1624, scale: 2, fontScale: 1 },
    });

    expect(scaleWidth(100)).toBeGreaterThan(100);
    expect(scaleHeight(100)).toBeGreaterThan(100);
    expect(scaleFont(16)).toBeGreaterThan(16);
  });
});
```

---

## Impact on Existing Files

### 1. `src/shared/components/Typography.tsx`
- Replace inline font styling maps with typography design token mappings.
- Clean up hardcoded style configurations.

### 2. `src/shared/components/PrimaryButton.tsx`
- Import constants from `src/shared/constants/colors.ts` and `src/shared/constants/spacing.ts`.
- Replace the static background color `rgba(217, 169, 65, 0.7)` with `Colors.primary`.

### 3. `src/navigation/BottomTabNavigator.tsx`
- Replace colors `'#E0C385'`, `'#F4E8DA'`, and `'#8E8E93'` with `Colors.primary`, `Colors.surface`, and `Colors.outline`.

### 4. `src/features/profile/screens/SettingsScreen.tsx`
- Remove the binary `SettingsToggleRow` element.
- Render a standard preferences row displaying the active language name. Clicking it opens the new `LanguageSelector` dialog overlay.

---

## Manual Verification Checklist
* [ ] Atomic components (`Typography`, `PrimaryButton`) render design-approved colors.
* [ ] The tab navigator highlights selected routes using `Colors.primary`.
* [ ] Settings page displays active preferences correctly.
* [ ] Tapping the language configuration options correctly toggles selection overlays.
* [ ] Jest tests execute and verify responsive scaling operations across mocked devices.
