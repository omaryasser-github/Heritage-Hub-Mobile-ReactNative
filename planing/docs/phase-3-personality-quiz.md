# Phase 3: Personality Quiz

## Folder Structure
The following files and folders will be added during this phase:
```text
src/
└── features/
    └── personality-quiz/
        ├── api/
        │   └── quizService.ts
        ├── components/
        │   ├── LikertCircle.tsx
        │   ├── QuestionRow.tsx
        │   └── QuizProgressBar.tsx
        ├── screens/
            └── PersonaQuizScreen.tsx
```

## Flow
1. First-time user is redirected here after Sign Up.
2. User views a list of behavioral statements ("I see myself as someone who...").
3. User selects a level of agreement using the gold Likert scale circles.
4. User taps "Next" to progress through the 7 questions.
5. Upon completion, the answers are submitted, and a Travel Persona (Explorer, Historian, etc.) is assigned.
6. User is navigated to the Home screen.

## States
* **Loading:** Fetching questions from the API or submitting the final results.
* **Error:** Failed to fetch questions or submit answers (show retry button).
* **Empty:** No answers selected yet (Disable "Next" button until all visible questions are answered).
* **Success:** Persona successfully assigned and saved.

## Logic
* **Calculation:** Track the values of the selected Likert circles (e.g., 1 to 5).
* **Validation:** The "Next" button must remain disabled until every question on the current page has a selected value.
* **Progress:** Update the `QuizProgressBar` (e.g., 1/7) as the user navigates.

## Components
* **Atoms:** 
  * `LikertCircle` (Scalable gold circles)
  * `QuizProgressBar`
* **Molecules:** 
  * `QuestionRow` (Text + Likert Scale group)
* **Organisms:** 
  * `QuizFormList`

## API
* **Endpoints:** 
  * `GET /api/quiz/personality/questions`
  * `POST /api/quiz/personality/submit`
* **Request/Response Structure:**
  * Request: `{ answers: [{ questionId, value }] }`
  * Response: `{ persona: "Explorer", recommendedCategories: [...] }`

## Testing
* **Automated Tests:**
  * `PersonaQuizScreen.test.tsx`: Ensure "Next" button is disabled until all questions are answered.
  * `PersonaQuizScreen.test.tsx`: Test that clicking a Likert circle updates the local state value.
* **Manual Checklist:**
  * [ ] Tap targets for Likert circles are at least 44x44pt.
  * [ ] Progress bar fills correctly.
  * [ ] The calculated Persona is successfully saved to the user's global profile state (Zustand).
