import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import FloatingPanel from './FloatingPanel';

function mountContentScript() {
  // 이미 마운트된 경우 중복 삽입 방지
  if (document.getElementById('chrome-ext-root')) return;

  // Shadow DOM 호스트 엘리먼트 생성
  const host = document.createElement('div');
  host.id = 'chrome-ext-root';
  document.body.appendChild(host);

  // Shadow Root 생성 (페이지 CSS와 격리)
  const shadowRoot = host.attachShadow({ mode: 'open' });

  // React 마운트 포인트
  const mountPoint = document.createElement('div');
  shadowRoot.appendChild(mountPoint);

  createRoot(mountPoint).render(
    <StrictMode>
      <FloatingPanel />
    </StrictMode>
  );
}

// DOM이 준비된 후 마운트
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountContentScript);
} else {
  mountContentScript();
}
