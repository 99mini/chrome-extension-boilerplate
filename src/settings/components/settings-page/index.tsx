import { useEffect, useState } from 'react';
import { DEFAULT_SETTINGS, SETTINGS_KEYS, type Settings } from '@/shared/settings';
import {
  Container,
  PageHeader,
  PageSubtitle,
  PageTitle,
  PageWrapper,
  SaveButton,
  SaveRow,
  Section,
  SectionBody,
  SectionHeader,
  SectionTitle,
  Select,
  SettingDescription,
  SettingInfo,
  SettingLabel,
  SettingRow,
  Toggle,
  ToggleInput,
  ToggleSlider,
} from './settings-page.style';

export const SettingsPage = () => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const set = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    chrome.storage.local.get(SETTINGS_KEYS, (result) => {
      setSettings({ ...DEFAULT_SETTINGS, ...(result as Partial<Settings>) });
    });
  }, []);

  const handleSave = () => {
    chrome.storage.local.set(settings, () => {
      alert('설정이 저장되었습니다.');
    });
  };

  return (
    <PageWrapper>
      <Container>
        <PageHeader>
          <PageTitle>Chrome Extension Settings</PageTitle>
          <PageSubtitle>확장프로그램 동작 방식을 설정합니다.</PageSubtitle>
        </PageHeader>

        <Section>
          <SectionHeader>
            <SectionTitle>새 탭 (New Tab)</SectionTitle>
          </SectionHeader>
          <SectionBody>
            <SettingRow>
              <SettingInfo>
                <SettingLabel>시계 표시</SettingLabel>
                <SettingDescription>새 탭 화면에 시계를 표시합니다.</SettingDescription>
              </SettingInfo>
              <Toggle>
                <ToggleInput
                  type="checkbox"
                  checked={settings.showClock}
                  onChange={(e) => set('showClock', e.target.checked)}
                />
                <ToggleSlider />
              </Toggle>
            </SettingRow>

            <SettingRow>
              <SettingInfo>
                <SettingLabel>할 일 목록 표시</SettingLabel>
                <SettingDescription>새 탭 화면에 Todo 목록을 표시합니다.</SettingDescription>
              </SettingInfo>
              <Toggle>
                <ToggleInput
                  type="checkbox"
                  checked={settings.showTodo}
                  onChange={(e) => set('showTodo', e.target.checked)}
                />
                <ToggleSlider />
              </Toggle>
            </SettingRow>

            <SettingRow>
              <SettingInfo>
                <SettingLabel>시계 형식</SettingLabel>
                <SettingDescription>12시간제 또는 24시간제를 선택합니다.</SettingDescription>
              </SettingInfo>
              <Select value={settings.clockFormat} onChange={(e) => set('clockFormat', e.target.value as '12' | '24')}>
                <option value="24">24시간</option>
                <option value="12">12시간</option>
              </Select>
            </SettingRow>
          </SectionBody>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>콘텐츠 스크립트 (Content Script)</SectionTitle>
          </SectionHeader>
          <SectionBody>
            <SettingRow>
              <SettingInfo>
                <SettingLabel>플로팅 패널 표시</SettingLabel>
                <SettingDescription>모든 웹 페이지에 플로팅 패널을 표시합니다.</SettingDescription>
              </SettingInfo>
              <Toggle>
                <ToggleInput
                  type="checkbox"
                  checked={settings.showFloatingPanel}
                  onChange={(e) => set('showFloatingPanel', e.target.checked)}
                />
                <ToggleSlider />
              </Toggle>
            </SettingRow>
          </SectionBody>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>외관 (Appearance)</SectionTitle>
          </SectionHeader>
          <SectionBody>
            <SettingRow>
              <SettingInfo>
                <SettingLabel>테마</SettingLabel>
                <SettingDescription>확장프로그램의 색상 테마를 선택합니다.</SettingDescription>
              </SettingInfo>
              <Select value={settings.theme} onChange={(e) => set('theme', e.target.value as 'dark' | 'light')}>
                <option value="dark">다크</option>
                <option value="light">라이트</option>
              </Select>
            </SettingRow>
          </SectionBody>
        </Section>

        <SaveRow>
          <SaveButton onClick={handleSave}>저장</SaveButton>
        </SaveRow>
      </Container>
    </PageWrapper>
  );
};
