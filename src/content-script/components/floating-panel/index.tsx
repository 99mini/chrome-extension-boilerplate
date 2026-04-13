import { useEffect, useState } from 'react';
import type { Settings } from '@/shared/settings';

import {
  Body,
  Divider,
  Header,
  HeaderTitle,
  InfoRow,
  Label,
  NoteInput,
  Panel,
  SaveBtn,
  SavedMsg,
  ToggleBtn,
  Value,
} from './floating-panel.style';

export const FloatingPanel = () => {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(true);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(['showFloatingPanel'], (result) => {
      if (result.showFloatingPanel !== undefined) {
        setVisible(result.showFloatingPanel as Settings['showFloatingPanel']);
      }
    });

    const listener = (changes: Record<string, { oldValue?: unknown; newValue?: unknown }>, area: string) => {
      if (area !== 'local') return;
      if ('showFloatingPanel' in changes) {
        setVisible(changes.showFloatingPanel.newValue as Settings['showFloatingPanel']);
      }
    };

    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);

  if (!visible) return null;

  const pageInfo = {
    title: document.title,
    url: location.href,
    domain: location.hostname,
  };

  const handleSave = () => {
    const key = `note:${pageInfo.domain}`;
    localStorage.setItem(key, note);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Panel>
      <Header onClick={() => setOpen((v) => !v)}>
        <HeaderTitle>Chrome Extension Panel</HeaderTitle>
        <ToggleBtn>{open ? '▾' : '▸'}</ToggleBtn>
      </Header>

      {open && (
        <Body>
          <InfoRow>
            <Label>Page Title</Label>
            <Value>{pageInfo.title}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Domain</Label>
            <Value>{pageInfo.domain}</Value>
          </InfoRow>
          <Divider />
          <InfoRow>
            <Label>Page Note</Label>
            <NoteInput
              placeholder="이 페이지에 대한 메모를 작성하세요..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </InfoRow>
          <SaveBtn onClick={handleSave}>저장</SaveBtn>
          {saved && <SavedMsg>저장되었습니다!</SavedMsg>}
        </Body>
      )}
    </Panel>
  );
};
