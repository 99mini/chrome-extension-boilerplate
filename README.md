# Chrome Extension Boilerplate

Chrome Extension Boilerplate with **Manifest V3**, **React**, **TypeScript**, **Vite**, and **Emotion**.

## Features

### New Tab Page
Replaces the default new tab with a custom React app. Reacts to settings changes in real-time via `chrome.storage.onChanged`.

- **Todo** — create, read, delete todo items using `chrome.storage.sync`
- **Clock** — displays current time in real-time (12h / 24h format)

### Popup
Simple panel shown when the toolbar icon is clicked.

- Navigate to New Tab
- Open extension settings page

### Settings Page
Full-page options UI registered as `chrome_url_overrides` options page.

- Toggle clock / todo visibility on New Tab
- Select clock format (12h / 24h)
- Toggle floating panel visibility on all pages
- Select theme (dark / light)

### Content Script (Floating Panel)
Injected into every page as a floating panel (bottom-right corner). Visibility controlled by settings.

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

> `yarn dev` runs the new tab and popup pages only. Content script UI requires loading the built extension.

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
├── shared/
│   ├── settings.ts              # Settings interface, DEFAULT_SETTINGS, SETTINGS_KEYS
│   └── mock/                    # chrome API stub for dev (localStorage-backed)
├── new-tab/
│   ├── new-tab-app.tsx          # reads settings + listens to storage changes
│   └── components/
│       ├── clock/               # Clock widget
│       └── todo/                # Todo widget
├── popup/
│   ├── popup-app.tsx
│   └── components/
│       └── setting/             # Popup menu (open New Tab / Settings)
├── settings/
│   ├── setting-app.tsx
│   └── components/
│       └── settings-page/       # Full settings UI
└── content-script/
    ├── index.tsx                # Shadow DOM + Emotion cache setup
    └── components/
        └── floating-panel/      # FloatingPanel component

src/new-tab-main.tsx             # new tab entry
src/popup-main.tsx               # popup entry
src/settings-main.tsx            # settings page entry

public/
└── manifest.json

vite.config.ts                   # new-tab + popup + settings build (ES module)
vite.content.config.ts           # content script build (IIFE, deps inlined)
```

## Shared Settings

All setting keys, types, and defaults are defined in `src/shared/settings.ts`:

```ts
interface Settings {
  showClock: boolean;        // show clock on new tab
  showTodo: boolean;         // show todo on new tab
  showFloatingPanel: boolean;// show floating panel on all pages
  clockFormat: '12' | '24'; // clock display format
  theme: 'dark' | 'light';  // UI theme
}
```

Settings are persisted via `chrome.storage.local`. The New Tab page subscribes to `chrome.storage.onChanged` and updates without a reload.
