# Phase 6: Chatbot (AI Agent)

## Folder Structure
The following files and folders will be added during this phase:
```text
src/
└── features/
    └── ai-agents/
        ├── api/
        │   └── chatService.ts
        ├── components/
        │   ├── ChatBubble.tsx
        │   ├── SuggestionPill.tsx
        │   └── AvatarHeader.tsx
        └── screens/
            └── ChatbotScreen.tsx
```

## Flow
1. User navigates to the Chatbot tab.
2. User is greeted by the AI Explorer Avatar and sees pre-defined suggestion pills (e.g., "Learn about ancient history").
3. User taps a suggestion pill OR types a custom query in the text input and sends it.
4. User sees an animated typing indicator from the bot.
5. The bot responds with the requested historical or cultural information.

## States
* **Loading:** Typing indicator (three bouncing dots) displays while waiting for the AI response.
* **Error:** Display a "Failed to connect to AI. Please try again." red system message in the chat feed.
* **Empty:** The initial state containing only the greeting message and suggestion pills.
* **Success:** Message successfully appended to the local chat history.

## Logic
* **Keyboard Handling:** The entire view must be wrapped in `KeyboardAvoidingView` (with `behavior="padding"` on iOS) so the input is never hidden.
* **Auto-Scroll:** Use a `ref` on the `FlashList` to automatically scroll to the bottom when a new message is added.
* **Context Preservation:** Maintain the chat history array in local component state (`useState`) during the active session.

## Components
* **Atoms:** 
  * `ChatInput` (Text input with rounded corners)
  * `SendButton`
* **Molecules:** 
  * `SuggestionPill` (Touchable text bubble)
  * `AvatarHeader` (Explorer graphic + Greeting text)
* **Organisms:** 
  * `ChatBubble` (Can be user or bot variant)
  * `MessageList`

## API
* **Endpoints:** 
  * `POST /api/ai/chat`
* **Request/Response Structure:**
  * Request: `{ message: "Who built the Sphinx?", history: [...] }`
  * Response: `{ reply: "The Great Sphinx is believed to have been built by...", suggestions: [...] }`

## Testing
* **Automated Tests:**
  * `ChatbotScreen.test.tsx`: Verify that tapping a `SuggestionPill` instantly adds a user message to the feed.
* **Manual Checklist:**
  * [ ] Keyboard opens without covering the input field.
  * [ ] List automatically scrolls to the newest message upon receiving an AI reply.
  * [ ] Heavy AI processing transitions gracefully via `InteractionManager` so UI doesn't freeze.
