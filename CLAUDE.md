# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn install        # Install dependencies
yarn dev            # Start dev server (Vite)
yarn build          # Build to dist/
yarn build:prod     # Run checks then build
yarn lint           # ESLint
yarn format         # Prettier (write)
yarn format:check   # Prettier (check only)
yarn tsc            # TypeScript type check
yarn check          # Run lint + format + tsc
```

No test framework is configured (`yarn test` exits with error).

## Architecture

This is a **Manifest V3 Chrome extension** that overrides the new tab page. The extension is built as a single Vite entry point (`index.html` → `newtab`) and outputs to `dist/`.

**Chrome API mocking for dev:** In development mode, Vite sets `MOCK_CHROME=true` via `define`. `src/mock/index.ts` checks this global and injects a `window.chrome` mock backed by `localStorage` instead of the real `chrome.storage.sync`. This lets the app run normally with `yarn dev` in the browser without the extension context.

**Alias:** `@` resolves to `src/` (configured in `vite.config.ts`).

**Component tree:**

- `src/main.tsx` — calls `mock()` then mounts `<App />`
- `src/App.tsx` — renders `<NewTab />`
- `src/newTab/index.tsx` — composes widgets
  - `src/newTab/widget/` — individual widgets (`Clock`, `Todo`)

**Styling:** Emotion (`@emotion/react`, `@emotion/styled`) for CSS-in-JS.

## Loading the Extension

1. Run `yarn build`
2. Open `chrome://extensions/`
3. Enable Developer mode → click **Load unpacked** → select the `dist/` folder
