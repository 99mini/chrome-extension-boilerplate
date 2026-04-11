# Chrome Extension Boilerplate

Chrome Extension Boilerplate with **Manifest V3**, **React**, **TypeScript**, **Vite**, and **Emotion**.

## Features

### New Tab Page
Replaces the default new tab with a custom React app.

- **Todo** — create, read, delete todo items using `chrome.storage.sync`
- **Clock** — displays current time in real-time

### Popup
Simple panel shown when the toolbar icon is clicked.

- Navigate to New Tab
- Open extension settings

### Content Script (Floating Panel)
Injected into every page as a floating panel (bottom-right corner).

- Displays the current page title and domain
- Per-domain memo saved to `localStorage`
- Collapsible UI, isolated from the host page via Shadow DOM

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

```bash
yarn install
yarn dev      # new tab + popup (chrome API mocked)
yarn build    # production build → dist/
```

> `yarn dev` runs the new tab page only. Content script UI requires loading the built extension.

## Commands

```bash
yarn lint        # Biome lint
yarn format      # Biome format (auto-fix)
yarn tsc         # TypeScript type check
yarn check       # Run all three
yarn build:prod  # yarn check + yarn build
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
├── mock/                        # chrome API stub for dev (localStorage-backed)
├── new-tab/
│   ├── index.html               # entry HTML
│   ├── main.tsx                 # mount entry
│   ├── App.tsx
│   └── components/
│       ├── clock/               # Clock widget
│       └── todo/                # Todo widget
├── popup/
│   ├── index.html               # entry HTML
│   ├── main.tsx                 # mount entry
│   ├── App.tsx
│   └── components/
│       └── setting/             # Setting panel
└── content-script/
    ├── index.tsx                # Shadow DOM + Emotion cache setup
    └── components/
        └── floating-panel/      # FloatingPanel component

public/
└── manifest.json

vite.config.ts                   # new-tab + popup build (ES module)
vite.content.config.ts           # content script build (IIFE, deps inlined)
```
