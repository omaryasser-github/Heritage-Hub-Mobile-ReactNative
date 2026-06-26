# Phase 4.1: Explore (Monument Details & 360° Panorama)

## Folder Structure
This phase extends the existing `explore` feature module to include the detail views and the native 3D engine.
```text
src/
└── features/
    └── explore/
        ├── api/
        │   ├── monumentService.ts
        │   └── panoramaService.ts
        ├── components/
        │   ├── 3d/
        │   │   ├── PanoramaViewer.tsx    # R3F Canvas and OrbitControls
        │   │   ├── SphereEnvironment.tsx # The 3D sphere mesh
        │   │   └── HotspotMarker.tsx     # 3D clickable mesh for hotspots
        │   ├── MonumentHeader.tsx        # Image + Title + Tabs + Favorite
        │   ├── ArticleCard.tsx           # Card for History/Culture items
        │   └── MediaBottomSheet.tsx      # Native bottom sheet for hotspot content
        └── screens/
            ├── MonumentDetailScreen.tsx  # The main tabbed detail view
            └── PanoramaScreen.tsx        # Fullscreen 3D viewer (or tab content)
```

## Flow
1. User taps a `MonumentCard` on the Home feed.
2. User is navigated to the `MonumentDetailScreen`.
3. The screen displays a hero image, Title, Location, a **Favorite (Heart) button**, and a horizontally scrollable Tab Bar ("History & Architecture", "Culture", "360 Panorama", "Media").
4. User scrolls through "History" or "Culture" to read `ArticleCard`s. A Call-to-Action (CTA) banner for the location's Quiz is prominently visible to tie into the Gamification phase.
5. User taps the "360 Panorama" tab. The app mounts the `PanoramaViewer` using React-Three-Fiber.
6. User swipes to pan around the static 360° spherical image natively at 60fps.
7. User taps a floating 3D `HotspotMarker` inside the panorama.
8. A native `MediaBottomSheet` slides up over the 3D canvas, displaying HD photos, text, or audio narration about that specific hotspot.

## States
* **Loading:** Skeleton loaders for the Monument details. The `PanoramaViewer` displays a native loading spinner while the heavy 8K/4K texture is decompressed into GPU memory.
* **Error:** Network error banner. If WebGL fails or an Out-Of-Memory (OOM) occurs, gracefully fallback to a static 2D image with an error message ("3D viewer unavailable on this device").
* **Success:** R3F Canvas renders the sphere smoothly and standard React Native UI overlays perfectly.

## Logic
* **3D Engine (React-Three-Fiber):** The 360 viewer is built completely natively using `@react-three/fiber` and `@react-three/drei`. We map the equirectangular image to the `BackSide` of a `sphereGeometry`.
* **Memory Management (Adaptive Quality):** To prevent OOM crashes on mid-range Android devices, the API returns multiple texture sizes (e.g., 2K, 4K, 8K). The client detects device capability/network and loads the safest texture size.
* **Hotspots:** Hotspots are rendered as standard `<mesh>` components inside the R3F `<Canvas>`. They use the R3F `onClick` synthetic event to trigger state changes (e.g., setting an `activeHotspotId`) which then opens a standard React Native bottom sheet on top of the canvas.
* **UX Improvements (from UI/UX Audit):** 
  - "Read more" text links are replaced with fully tappable `ArticleCard` surfaces for better touch accessibility (>44pt).
  - Contextual actions (Favorite, Share) replace the global hamburger menu on deep screens.
  - The Tab Bar is wrapped in a horizontally scrolling view to perfectly support RTL Arabic text lengths without breaking the layout.

## Components
* **Atoms:** 
  - `HotspotMarker` (3D Mesh icon inside R3F)
  - `LocationBadge`
* **Molecules:** 
  - `ArticleCard` (Tappable surface with icon, title, description)
  - `TabButton` (Active/Inactive states)
* **Organisms:** 
  - `MonumentHeader` (Hero layout)
  - `PanoramaViewer` (The entire R3F scene)
  - `MediaBottomSheet` (Handles standard React Native UI over the 3D canvas)

## API
* **Endpoints:** 
  - `GET /api/explore/monuments/:id` (Returns details, articles, video links, quiz links)
  - `GET /api/explore/panorama/:monumentId`
* **Request/Response Structure:**
  - Panorama Response: 
    ```json
    {
      "panoramaId": "123",
      "textures": { 
        "high": "url_8k.jpg", 
        "low": "url_2k.jpg" 
      },
      "hotspots": [
        { 
          "id": "h1", 
          "pitch": 14.2, 
          "yaw": -45.1, 
          "title": "Statue of Ramses", 
          "content": "..." 
        }
      ]
    }
    ```

## Testing
* **Automated Tests:**
  - `MonumentDetailScreen.test.tsx`: Verify the Favorite toggle optimistic update works correctly.
  - `ArticleCard.test.tsx`: Ensure the entire card fires the `onPress` event, not just a small text link.
* **Manual Checklist:**
  - [ ] **OOM Test:** Load the 360 panorama on a low-end Android device to ensure the texture decompression doesn't crash the app.
  - [ ] **RTL Support:** The Tab Bar scrolls correctly from right-to-left in Arabic, preventing text truncation.
  - [ ] **Gesture Conflict:** Ensure swiping the 360 camera (`OrbitControls`) does not accidentally trigger React Navigation's native "swipe back" or "drawer open" gestures.
  - [ ] **Hotspot Touch Targets:** Ensure tapping a 3D hotspot is easy (make the invisible 3D hit-box slightly larger than the visual icon so users don't have to be pixel-perfect).
