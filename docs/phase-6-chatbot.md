# Phase 6: Chatbot (AI Agent)

## Folder Structure
The following files and folders will be added during this phase:
```text
src/
└── features/
    └── chatbot/
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
4. User sees an animated typing indicator from the bot. The suggestion pills are gracefully animated out (faded/collapsed).
5. The bot responds with the requested historical or cultural information, rendered with rich text.
6. The user can optionally tap a "Reset/New Chat" button in the header to clear the context and restart the conversation.

## States
* **Loading:** Typing indicator (three bouncing dots) displays while waiting for the AI response.
* **Error:** Display a "Failed to connect to AI. Please try again." red system message in the chat feed. (Offline handling will be iterated on post-MVP).
* **Empty:** The initial state containing only the greeting message and suggestion pills.
* **Success:** Message successfully appended to the local chat history.

## Logic
* **State Management (Client State):** Maintain the chat history in a **Zustand** store (`useChatbotStore`). This ensures that context and history are preserved even if the screen is aggressively unmounted or the user navigates across tabs.
* **Server State (TanStack Query):** Use `useMutation` for the AI chat requests to cleanly handle loading states, optimistic updates, and automatic retries.
* **Keyboard Handling:** The entire view must be wrapped in `KeyboardAvoidingView` (with `behavior="padding"` on iOS) so the input is never hidden.
* **Auto-Scroll:** Use a `ref` on the `FlashList` to automatically scroll to the bottom when a new message is added.
* **RTL & Localization:** Ensure `ChatBubble` flex direction and text alignment dynamically respond to RTL layout constraints (Arabic vs. English). User messages align to the layout end, Bot messages to the start.

## Components
* **Atoms:** 
  * `ChatInput` (Text input with rounded corners)
  * `SendButton`
  * `ResetChatButton` (Icon button in the header to clear context)
* **Molecules:** 
  * `SuggestionPill` (Touchable text bubble)
  * `AvatarHeader` (Explorer graphic + Greeting text + Reset Button)
* **Organisms:** 
  * `ChatBubble` (User or Bot variant. **Must include a Markdown parser** to handle AI formatting like bolding, bullet points, etc.)
  * `MessageList`

## API
* **Endpoints:** 
  * `POST /api/ai/chat`
* **Request/Response Structure:**
  * Request: `{ agentId: "explorer", message: "Who built the Sphinx?", history: [...] }`
  * Response: `{ reply: "The Great Sphinx is believed to have been built by...", suggestions: [...] }`

## Testing
* **Automated Tests:**
  * `ChatbotScreen.test.tsx`: Verify that tapping a `SuggestionPill` instantly adds a user message to the feed.
* **Manual Checklist:**
  * [ ] Keyboard opens without covering the input field.
  * [ ] List automatically scrolls to the newest message upon receiving an AI reply.
  * [ ] Chat history is preserved when switching to another tab and back.
  * [ ] Markdown elements (bold, lists) render correctly in AI responses.
  * [ ] Arabic text aligns correctly and chat bubbles flip sides in RTL mode.
  * [ ] Heavy AI processing transitions gracefully via `InteractionManager` so UI doesn't freeze.
