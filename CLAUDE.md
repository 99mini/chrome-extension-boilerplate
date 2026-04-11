# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn install        # Install dependencies
yarn dev            # Start dev server (Vite)
yarn build          # Build to dist/ (runs both newtab + content script builds)
yarn build:prod     # Run checks then build
yarn lint           # Biome lint
yarn format         # Biome format (write)
yarn tsc            # TypeScript type check
yarn check          # Run lint + format + tsc
```

No test framework is configured (`yarn test` exits with error).

## Build System

The extension requires **two separate Vite builds** because the content script must be a self-contained IIFE (Chrome rejects ES module `import` statements in content scripts):

1. **`vite build`** — builds `index.html` → `dist/assets/newtab-[hash].js` (new tab page, ES module)
2. **`vite build --config vite.content.config.ts`** — builds `src/content-script/index.tsx` → `dist/contentScript.js` (IIFE, all deps inlined)

`yarn build` runs both in sequence. The content script config sets `emptyOutDir: false` to avoid clobbering the newtab output.

## Architecture

This is a **Manifest V3 Chrome extension** with two distinct entry points:

### New Tab Page (`src/main.tsx`)
Overrides the browser new tab via `chrome_url_overrides.newtab`. Entry chain:
- `src/main.tsx` — calls `mock()` then mounts `<App />`
- `src/App.tsx` → `src/new-tab/index.tsx` — composes `<Todo />` and `<Clock />` widgets
- `src/new-tab/widget/` — individual widgets; each has an `index.tsx` and a `*.style.ts` using `@emotion/styled`

**Chrome API mocking:** In `yarn dev`, Vite defines `MOCK_CHROME=true`. `src/mock/index.ts` injects a `window.chrome` stub backed by `localStorage`, so the app runs in the browser without an extension context.

### Content Script (`src/content-script/`)
Injected into all pages (`"matches": ["<all_urls>"]`). Mounts `<FloatingPanel />` inside a **Shadow DOM** to isolate styles from the host page.

**Emotion + Shadow DOM:** Because Shadow DOM blocks external stylesheets, a custom Emotion cache is created with `container` pointing to a `<div>` inside the shadow root. The `<CacheProvider>` wraps `<FloatingPanel />` so styled components inject into the shadow root, not `<head>`.

Entry: `src/content-script/index.tsx` → `src/content-script/components/floating-panel/`
- `index.tsx` — component logic
- `floating-panel.style.ts` — `@emotion/styled` styled components

### Styling Convention
- New tab widgets: `*.style.ts` alongside the component, exports named styled components
- Content script: same pattern, but must work inside Shadow DOM (see above)
- **Alias:** `@` resolves to `src/`

## Loading the Extension

1. Run `yarn build`
2. Open `chrome://extensions/`
3. Enable Developer mode → click **Load unpacked** → select the `dist/` folder
