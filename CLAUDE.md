# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn install        # Install dependencies
yarn dev            # Start dev server (Vite)
yarn build          # Build to dist/ (runs newtab + popup + content script builds)
yarn build:prod     # Run checks then build
yarn lint           # Biome lint
yarn lint:fix         # Biome format (write)
yarn tsc            # TypeScript type check
yarn check          # Run lint + tsc
```

No test framework is configured (`yarn test` exits with error).

## Build System

The extension requires **two separate Vite builds**:

1. **`vite build`** (`vite.config.ts`) — builds new tab and popup together as ES modules:
   - `src/new-tab/index.html` → `dist/index.html` + `dist/assets/newtab-[hash].js`
   - `src/popup/index.html` → `dist/popup.html` + `dist/assets/popup-[hash].js`

2. **`vite build --config vite.content.config.ts`** — builds content script as a single IIFE (Chrome rejects ES module `import` in content scripts):
   - `src/content-script/index.tsx` → `dist/contentScript.js` (all deps inlined)

`yarn build` runs both in sequence. The content script config sets `emptyOutDir: false` to avoid clobbering the first build's output.

## Architecture

This is a **Manifest V3 Chrome extension** with four entry points:

### New Tab (`src/new-tab/`)
Overrides the browser new tab via `chrome_url_overrides.newtab`.
- `src/new-tab-main.tsx` — entry, calls `mock()` then mounts `<NewTabApp />`
- `new-tab-app.tsx` — loads settings from `chrome.storage.local`, subscribes to `chrome.storage.onChanged`, renders `<Todo />` and `<Clock />`
- `components/` — individual widgets, each with `index.tsx` + `*.style.ts`

### Popup (`src/popup/`)
Rendered when the toolbar icon is clicked (`action.default_popup`).
- `src/popup-main.tsx` — entry, calls `mock()` then mounts `<PopupApp />`
- `popup-app.tsx` — renders `<Setting />`
- `components/setting/` — popup menu with buttons to open New Tab and Settings page

### Settings (`src/settings/`)
Full-page options UI registered as the extension's options page (`options_ui`).
- `src/settings-main.tsx` — entry, calls `mock()` then mounts `<SettingApp />`
- `setting-app.tsx` — renders `<SettingsPage />`
- `components/settings-page/` — reads and writes all settings via `chrome.storage.local`

### Content Script (`src/content-script/`)
Injected into all pages. Mounts `<FloatingPanel />` inside a **Shadow DOM** to isolate styles from the host page.
- `index.tsx` — creates shadow root, sets up Emotion cache, mounts component
- `components/floating-panel/` — reads `showFloatingPanel` from storage; hides itself when disabled

**Emotion + Shadow DOM:** A custom Emotion cache is created with `container` pointing to a `<div>` inside the shadow root, so `<CacheProvider>` injects styles into the shadow root instead of `<head>`.

## Shared Settings (`src/shared/settings.ts`)

Single source of truth for all settings-related types and defaults. Import from here whenever reading or writing settings.

```ts
interface Settings {
  showClock: boolean;
  showTodo: boolean;
  showFloatingPanel: boolean;
  clockFormat: '12' | '24';
  theme: 'dark' | 'light';
}
```

- `DEFAULT_SETTINGS` — default values for all keys
- `SETTINGS_KEYS` — typed array of all keys, used as the argument to `chrome.storage.local.get()`

## Styling Convention

All styled components live in `*.style.ts` files alongside their component, using `@emotion/styled`. Named exports only (no default exports).

## Chrome API Mocking

In `yarn dev`, Vite defines `MOCK_CHROME=true`. `src/shared/mock/index.ts` injects a `window.chrome` stub backed by `localStorage`. The entry files (`new-tab-main.tsx`, `popup-main.tsx`, `settings-main.tsx`) call `mock()` on startup.

> Content script is not available in `yarn dev` — only testable via the built extension.

**Alias:** `@` resolves to `src/`

## Loading the Extension

1. Run `yarn build`
2. Open `chrome://extensions/`
3. Enable Developer mode → click **Load unpacked** → select the `dist/` folder
