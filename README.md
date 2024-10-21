# Chrome Extension Boilerplate

Chrome Extension Boilerplate with `Manifest-v3`, `React`, `Typescript` and `Vite`.

https://github.com/user-attachments/assets/08327524-bd91-4681-818e-1975b5d33186

- `Todo`: create, read, remove todo list using `chrome.storage.sync.get`, `chrome.storage.sync.set`
- `Clock`: display now time(`new Date().toLocaleTimeString()`)

# Stack

- yarn 4.2.2
- React
- TypeScript
- Vite
- Emotion
- eslint
- prettier
- manifest-v3

# Dev

## Dependency

```bash
yarn install
```

## dev

```bash
yarn dev
```

## build

```bash
yarn build
```

## lint, pritter, tsc

```bash
yarn lint
yarn format
yarn tsc
```

run all lint (`eslint`, `prettier`, `tsc`)

```bash
yarn check
```

## product

```bash
yarn build
```

1. open [chrome://extensions/](chrome://extensions/)
2. click `load unpacked`
3. select `dist` folder
