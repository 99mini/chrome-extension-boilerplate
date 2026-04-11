# Chrome Extension Boilerplate

Chrome Extension Boilerplate with **Manifest V3**, **React**, **TypeScript**, **Vite**, and **Emotion**.

https://github.com/user-attachments/assets/08327524-bd91-4681-818e-1975b5d33186

## Features

### New Tab Page
Replaces the default new tab with a custom React app.

- **Todo** — create, read, delete todo items using `chrome.storage.sync`
- **Clock** — displays current time in real-time

### Content Script (Floating Panel)
Injected into every page as a floating panel (bottom-right corner).

- Displays the current page title and domain
- Per-domain memo saved to `localStorage`
- Collapsible panel UI, isolated from the host page via Shadow DOM

## Stack

| Category | Library |
|---|---|
| Framework | React 18 |
| Language | TypeScript |
| Bundler | Vite 5 |
| Styling | Emotion (`@emotion/styled`) |
| Linter / Formatter | Biome |
| Extension API | Manifest V3 |
| Package Manager | Yarn 4 |

## Getting Started

### Install

```bash
yarn install
```

### Development

```bash
yarn dev
```

Runs the new tab page in the browser via Vite dev server. `chrome.storage.sync` is automatically mocked with `localStorage` so you can develop without loading the extension.

> Content script UI is not available in `yarn dev` — load the built extension to test it.

### Build

```bash
yarn build
```

Runs two builds in sequence:
1. New tab page → `dist/assets/`
2. Content script → `dist/contentScript.js` (single IIFE, all dependencies inlined)

### Code Quality

```bash
yarn lint        # Biome lint
yarn format      # Biome format (auto-fix)
yarn tsc         # TypeScript type check
yarn check       # Run all three
```

## Loading the Extension

1. Run `yarn build`
2. Open `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked** → select the `dist/` folder

After any code change, re-run `yarn build` and click the refresh icon on `chrome://extensions/`.

## Project Structure

```
src/
├── main.tsx                      # New tab entry point
├── App.tsx
├── new-tab/
│   ├── index.tsx                 # Composes widgets
│   └── widget/
│       ├── clock/                # Clock widget
│       └── todo/                 # Todo widget
├── contentScript/
│   ├── index.tsx                 # Mounts FloatingPanel into Shadow DOM
│   └── components/floating-panel/
│       ├── index.tsx
│       └── floating-panel.style.ts
├── mock/
│   └── index.ts                  # chrome API mock for dev
public/
└── manifest.json
vite.config.ts                    # New tab build
vite.content.config.ts            # Content script build (IIFE)
```
