# Phase 8: Mobile Responsive Layout Architecture

## 1. Overview & Constraints

This phase outlines the strategic plan to implement a robust, responsive architecture across the Heritage Hub application. The goal is to achieve **Portability**—ensuring the application looks and functions perfectly across all iOS and Android *mobile* screen sizes.

### 🛑 Strict Constraints
- **No Visual Changes**: The current UI components, styling, color palettes, and core design layouts will **not** change. This is strictly a structural scaling and dynamic layout refactor.
- **Mobile Only (For Now)**: This phase targets varying mobile phone sizes (e.g., iPhone SE to iPhone 15 Pro Max, and equivalent Android devices). 
- **Tablet Deferral**: Tablet responsiveness (iPad, Android Tablets) is out of scope for this phase and will be handled as a dedicated submodule in the future.

---

## 2. Core Responsive Strategies

Before modifying individual features, we will establish a set of global responsive utilities:

1. **Dynamic Dimensions (`useWindowDimensions`)**
   - Replace any static `Dimensions.get('window')` calls with the `useWindowDimensions` hook to automatically handle foldable phone state changes and rotation.
2. **Scale-Based Font Sizing**
   - Implement a custom scaling utility (e.g., `scaleFont()`) that calculates font sizes based on a baseline screen width (e.g., 375px).
   - *Crucial*: We will strictly respect OS-level accessibility font scaling (`allowFontScaling={true}`) while preventing cartoonishly large text on pro-max devices.
3. **Flexbox-First Layouts**
   - Eliminate hardcoded absolute dimensions (e.g., `width: 350`, `height: 800`).
   - Strictly enforce `flex: 1`, percentage widths (`width: '90%'`), and flex alignment (`justifyContent`, `alignItems`) to let the React Native Yoga engine handle the heavy lifting.
4. **Pixel Density Mapping (`PixelRatio`)**
   - Use `PixelRatio.roundToNearestPixel()` for fine details like `borderWidth`, `borderRadius`, and subtle dividers to prevent visual blurring on low-density Android devices.

---

## 3. Feature-by-Feature Implementation Plan

### Phase 1: Splash Screen (`features/splash`)
- **Action**: Convert absolute positioning to flex-based centering.
- **Details**: Ensure the splash logo and title scale appropriately using our custom font scaler. Bottom-anchored elements (like the "Get Started" button) must rely on flex-end or percentages (`bottom: 5%`) rather than hardcoded pixels.

### Phase 2: Authentication (`features/auth`)
- **Action**: Dynamic Form Scaling & Keyboard Resilience.
- **Details**: 
  - Ensure `AuthInput` and `PasswordInput` widths are set to `100%` of their flex container, never fixed widths.
  - Scale the top and bottom paddings of the `ScrollView` dynamically based on screen height.
  - Fine-tune `KeyboardAvoidingView` to ensure the login/signup buttons are never hidden on smaller devices like the iPhone SE.

### Phase 3: Personality Quiz (`features/personality-quiz`)
- **Action**: Fluid Quiz Cards & Progress Bars.
- **Details**: 
  - The `QuizProgressBar` must use percentage-based filling (`width: ${progress}%`) rather than fixed widths.
  - Ensure question text dynamically scales so long questions don't overflow on narrow screens.
  - Apply `flexWrap: 'wrap'` to any custom selection grids so options elegantly drop to the next line on small screens.

### Phase 4: Explore / Home (`features/explore`)
- **Action**: Aspect-Ratio Headers & Dynamic Columns.
- **Details**:
  - The `ImageBackground` header must maintain its visual ratio across wide and narrow phones.
  - Ensure the `FlashList` of monument cards computes its column width dynamically based on the current screen width minus horizontal padding, preventing horizontal clipping.

### Phase 5: Profile & Settings (`features/profile`)
- **Action**: Scalable Rows & Horizontal Overflows.
- **Details**:
  - Ensure `SettingsRow` utilizes `flex: 1` on the text container to push the toggle switch to the far right, regardless of screen width.
  - The `BadgeHorizontalList` and `FavoriteCarousel` must use `ScrollView` with `horizontal` true, ensuring infinite horizontal scaling without squishing components.

### Phase 6: AI Chatbot (`features/chatbot`)
- **Action**: Liquid Message Bubbles.
- **Details**:
  - Chat bubbles must use `maxWidth: '80%'` to prevent long messages from stretching edge-to-edge.
  - The input bar must anchor accurately above the keyboard on all devices, leveraging safe area insets and `useWindowDimensions`.

### Phase 7: Gaming Hub (`features/gamification`)
- **Action**: Proportionate Launch Cards.
- **Details**:
  - The `GameLaunchCard` padding, internal image sizes, and typography must scale synchronously using our scale-based utilities to maintain its prominent visual hierarchy on both small Androids and large iPhones.

---

## 4. Next Steps for Execution

1. **Create Utility Folder**: Setup `src/shared/utils/responsive.ts` to house `scaleFont`, `scaleWidth`, and `scaleHeight` functions.
2. **Audit & Replace**: Systematically move through the features listed above, replacing fixed numeric values (`px`) with our responsive utilities and percentage/flex values.
3. **Cross-Device Testing**: Continuously test each feature on an iOS Simulator (iPhone SE + iPhone 15 Pro Max) and an Android Emulator (Pixel 4 + Pixel Fold).
