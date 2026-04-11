# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn install        # Install dependencies
yarn dev            # Start dev server (Vite)
yarn build          # Build to dist/ (runs newtab + popup + content script builds)
yarn build:prod     # Run checks then build
yarn lint           # Biome lint
yarn format         # Biome format (write)
yarn tsc            # TypeScript type check
yarn check          # Run lint + format + tsc
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

This is a **Manifest V3 Chrome extension** with three entry points:

### New Tab (`src/new-tab/`)
Overrides the browser new tab via `chrome_url_overrides.newtab`.
- `index.html` + `main.tsx` — entry, calls `mock()` then mounts `<App />`
- `App.tsx` — renders `<Todo />` and `<Clock />`
- `components/` — individual widgets, each with `index.tsx` + `*.style.ts`

### Popup (`src/popup/`)
Rendered when the toolbar icon is clicked (`action.default_popup`).
- `index.html` + `main.tsx` — entry, calls `mock()` then mounts `<App />`
- `App.tsx` — renders `<Setting />`
- `components/setting/` — popup UI with `index.tsx` + `*.style.ts`

### Content Script (`src/content-script/`)
Injected into all pages. Mounts `<FloatingPanel />` inside a **Shadow DOM** to isolate styles from the host page.
- `index.tsx` — creates shadow root, sets up Emotion cache, mounts component
- `components/floating-panel/` — component + `*.style.ts`

**Emotion + Shadow DOM:** A custom Emotion cache is created with `container` pointing to a `<div>` inside the shadow root, so `<CacheProvider>` injects styles into the shadow root instead of `<head>`.

## Styling Convention

All styled components live in `*.style.ts` files alongside their component, using `@emotion/styled`. Named exports only (no default exports).

## Chrome API Mocking

In `yarn dev`, Vite defines `MOCK_CHROME=true`. `src/mock/index.ts` injects a `window.chrome` stub backed by `localStorage`. Both `src/new-tab/main.tsx` and `src/popup/main.tsx` call `mock()` on startup.

> Content script is not available in `yarn dev` — only testable via the built extension.

**Alias:** `@` resolves to `src/`

## Loading the Extension

1. Run `yarn build`
2. Open `chrome://extensions/`
3. Enable Developer mode → click **Load unpacked** → select the `dist/` folder
