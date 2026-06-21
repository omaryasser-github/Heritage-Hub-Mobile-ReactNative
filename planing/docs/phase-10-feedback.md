# Phase 10: Feedback System

## Folder Structure
This feature is implemented as a standalone domain module.
```text
src/
└── features/
    └── feedback/
        ├── api/
        │   └── feedbackService.ts    # POST /api/feedback logic
        ├── components/
        │   └── FeedbackForm.tsx      # Form with validation
        └── screens/
            └── FeedbackScreen.tsx    # Full screen layout
```

## Flow
1. User navigates to Settings (via Profile) or opens the Home Drawer Menu.
2. User taps "Help & Feedback" or "Report an Issue".
3. User is navigated to the `FeedbackScreen`.
4. User selects a category (e.g., "Bug", "Suggestion", "Content Issue", "Other") from a dropdown picker.
5. User enters their message in a multiline text area.
6. User taps "Submit".
7. A loading indicator appears on the button.
8. On success, a native toast message ("Thank you for your feedback!") is shown.
9. The screen automatically pops back to the previous screen (`navigation.goBack()`).

## States
* **Empty:** The "Submit" button is disabled until a category is selected and the message contains text (e.g., > 10 characters).
* **Loading:** The "Submit" button shows a loading spinner and form inputs are disabled during the API call.
* **Error:** A toast or inline error message indicates the submission failed (e.g., network error), allowing the user to retry without losing their typed text.
* **Success:** A toast message thanks the user, and navigation returns them to the prior screen.

## Logic
* **Form Handling:** Use `react-hook-form` to manage local state and validation without triggering unnecessary re-renders on every keystroke.
* **API Call:** Use TanStack Query's `useMutation` to handle the POST request. This automatically provides `isPending` and `isError` states.
* **Auth Context:** The API call will automatically include the user's JWT from the `auth` module (since the Guest flow is deferred), allowing the backend to link the feedback to a specific user.

## Components
* **Atoms:** `TextAreaInput`, `DropdownPicker`.
* **Molecules:** `FeedbackForm` (combines the inputs, validation logic, and submit button).
* **Organisms:** `FeedbackScreen` (provides the safe area layout, keyboard avoiding behavior, and navigation).

## API
* **Endpoints:** 
  - `POST /api/feedback`
* **Request Payload:**
  ```json
  {
    "category": "Bug",
    "message": "The panorama on the Karnak Temple is not loading on my device."
  }
  ```
* **Response:**
  ```json
  {
    "success": true,
    "message": "Feedback submitted successfully."
  }
  ```

## Testing
* **Automated Tests:**
  - `FeedbackForm.test.tsx`: Verify the submit button remains disabled when the message is empty. Verify the `onSubmit` function is called with the correct data structure when valid.
* **Manual Checklist:**
  - [ ] **Keyboard Behavior:** Ensure the multiline input is fully visible and not hidden by the keyboard (using `KeyboardAvoidingView` with correct padding).
  - [ ] **RTL Support:** Ensure the text aligns to the right and the dropdown icon flips when the app is in Arabic mode.
  - [ ] **Data Retention:** Ensure that if the API call fails, the user's typed message is NOT cleared, allowing them to try again.
