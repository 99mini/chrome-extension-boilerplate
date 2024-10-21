# Chrome Extension Boilerplate

Chrome Extension Boilerplate with `Manifest-v3`, `React`, `Typescript` and `Vite`.

https://github.com/user-attachments/assets/08327524-bd91-4681-818e-1975b5d33186

- `Todo`: `chrome.storage.sync.get`, `chrome.storage.sync.set`을 이용하여 투두 리스트 저장.
- `Clock`: 현재 시간 반환(`new Date().toLocaleTimeString()`)

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
2. `압축해제된 확장 프로그램을 로드합니다` 클릭
3. `dist` 폴더 선택
