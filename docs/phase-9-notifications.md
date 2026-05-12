# Phase 9: Notification System

## Folder Structure
Following the Feature-Sliced Architecture defined in `FRONTEND_WORKFLOW.md`:
```text
src/
└── features/
    └── notifications/
        ├── api/
        │   └── notificationService.ts  # Fetching notifications, mark as read
        ├── components/
        │   ├── NotificationCard.tsx    # Molecule: Individual notification item
        │   ├── NotificationList.tsx    # Organism: Grouped list (Today, Yesterday)
        │   └── NotificationIcon.tsx    # Atom: Category-specific icons (Badge, Coin, Map)
        ├── hooks/
        │   └── useNotifications.ts     # TanStack Query logic & unread count
        └── screens/
            └── NotificationScreen.tsx  # Main Inbox Screen
```

## Flows
### A. Notification Inbox Flow
1. User taps the "Bell" icon in the Header/Profile.
2. `NotificationScreen` fetches data using `useNotifications`.
3. Notifications are displayed in a grouped list (Today, Yesterday, Older).
4. User taps a notification → App navigates to the relevant screen (e.g., Quest detail, Landmark).
5. Notification is marked as "Read" via API.

### B. Real-Time Feedback (Non-Inbox)
*   **Safety Alerts:** Real-time toast/inline warning for sensitive input in Chatbot.
*   **System Alerts:** Modals for AI Disclaimer or critical maintenance.
*   *Note: These do not persist in the Notification Inbox.*

## States
*   **Loading:** Skeleton loaders matching the `NotificationCard` shape.
*   **Empty:** "You're all caught up!" state with a cultural illustration.
*   **Unread:** Notification cards feature a gold indicator dot and subtle elevation.
*   **Success:** List rendered with chronological headers.

## Logic
*   **Deep Linking:** Every notification object contains a `deepLink` string (e.g., `heritage-hub://quest/123`).
*   **Grouping:** Client-side logic to group the flat API array into "Today", "Yesterday", and "Older" sections.
*   **Icon Mapping:** A utility to map `category` (e.g., `GAMIFICATION`, `CONTENT`, `LANDMARK`) to specific vector icons.
*   **Unread Count:** Global Zustand state (managed by `useNotifications`) to show a badge on the home screen bell icon.

## Components
*   **Atoms:**
    *   `NotificationIcon`: Themed icons with specific background colors.
    *   `UnreadIndicator`: Small gold dot.
*   **Molecules:**
    *   `NotificationCard`: Includes title, description, timestamp, icon, and chevron.
*   **Organisms:**
    *   `NotificationGroupList`: A `SectionList` (or `FlashList`) implementation for grouped notifications.

## API
*   **Endpoints:**
    *   `GET /api/notifications`: Returns paginated list of notifications.
    *   `PATCH /api/notifications/:id/read`: Marks a single notification as read.
    *   `PATCH /api/notifications/read-all`: Marks all as read.
    *   `DELETE /api/notifications/:id`: Removes a notification.
*   **Response Structure:**
    ```json
    {
      "id": "string",
      "type": "QUEST_COMPLETED | DAILY_REWARD | NEARBY_LANDMARK | ARTIFACT_DAILY | ANNIVERSARY",
      "title": "string",
      "message": "string",
      "timestamp": "ISO8601",
      "isRead": "boolean",
      "deepLink": "string",
      "metadata": { "id": "string", "category": "string" }
    }
    ```

## Testing
*   **Unit Tests:**
    *   `groupNotifications.test.ts`: Validates date grouping logic.
    *   `NotificationCard.test.tsx`: Ensures correct icon renders for each category.
*   **Integration Tests:**
    *   `NotificationScreen.test.tsx`: Validates "Mark all as read" functionality.

## Checklist
*   [ ] RTL: Ensure timestamps and icons flip correctly for Arabic.
*   [ ] Accessibility: Minimum 44px tap target for each notification card.
*   [ ] Performance: Use `FlashList` for smooth scrolling of long notification histories.
*   [ ] Contrast: Gold/Brown text must be legible against the cream card background.
