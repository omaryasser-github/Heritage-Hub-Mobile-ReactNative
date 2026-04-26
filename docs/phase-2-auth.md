# Phase 2: Auth (Login / Sign Up)

## Folder Structure
The following files and folders will be added during this phase:
```text
src/
└── features/
    └── auth/
        ├── api/
        │   └── authService.ts
        ├── components/
        │   ├── SocialLoginButton.tsx
        │   ├── AuthInput.tsx
        │   └── PasswordInput.tsx
        └── screens/
            ├── LoginScreen.tsx
            └── SignUpScreen.tsx
```

## Flow
1. User arrives at the Login screen.
2. User enters Email and Password OR selects "continue with Google/Facebook".
3. If the user doesn't have an account, they tap "Let's Create an account" and navigate to the SignUp screen.
4. User submits the form.
5. App validates the form, calls the API, and stores the received auth token.
6. User is routed to the Personality Quiz (if new) or Home screen (if returning).

## States
* **Loading:** The Login button shows an activity indicator, form fields are disabled.
* **Error:** Invalid credentials or validation errors (e.g., "Email is required"). Displayed directly under the relevant input or via a toast.
* **Empty:** Initial form state with empty fields.
* **Success:** Token is received, saved to SecureStore, and Zustand state is updated.

## Logic
* **Form Validation:** Use Zod or Yup with `react-hook-form` to validate email formats and password strength.
* **State Management:** Upon success, update the `useAuthStore` (Zustand) with the user profile and token.
* **Security:** Tokens must be stored in `expo-secure-store`, NOT `AsyncStorage`.

## Components
* **Atoms:** 
  * `AuthInput`, `PasswordInput` (Glassmorphism style)
  * `PrimaryButton`
* **Molecules:** 
  * `SocialLoginButton` (Google/Facebook buttons with icons)
* **Organisms:** 
  * `LoginForm`, `SignUpForm`

## API
* **Endpoints:** 
  * `POST /api/auth/login`
  * `POST /api/auth/register`
* **Request/Response Structure:**
  * Request: `{ email, password }`
  * Response: `{ token: string, user: { id, name, email, persona } }`

## Testing
* **Automated Tests:**
  * `LoginScreen.test.tsx`: Validates error states for empty email/password.
  * `LoginScreen.test.tsx`: Validates successful API call and navigation.
* **Manual Checklist:**
  * [ ] Contrast check: White text is readable against the background image.
  * [ ] Social login buttons trigger the correct native OAuth flow.
  * [ ] Token is securely saved and persists across app restarts.
  * [ ] Keyboard does not cover the Login/Signup inputs (`KeyboardAvoidingView` applied).
