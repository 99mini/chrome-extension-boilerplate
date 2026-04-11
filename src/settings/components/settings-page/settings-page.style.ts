import styled from '@emotion/styled';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: #1e1e2e;
  color: #cdd6f4;
  font-family: system-ui, sans-serif;
  font-size: 14px;
`;

export const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 24px;
`;

export const PageHeader = styled.div`
  margin-bottom: 36px;
`;

export const PageTitle = styled.h1`
  margin: 0 0 6px;
  font-size: 24px;
  font-weight: 700;
  color: #cba6f7;
`;

export const PageSubtitle = styled.p`
  margin: 0;
  font-size: 13px;
  color: #6c7086;
`;

export const Section = styled.section`
  background: #313244;
  border: 1px solid #45475a;
  border-radius: 12px;
  margin-bottom: 20px;
  overflow: hidden;
`;

export const SectionHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #45475a;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #89b4fa;
`;

export const SectionBody = styled.div`
  padding: 4px 0;
`;

export const SettingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  gap: 16px;

  & + & {
    border-top: 1px solid #313244;
  }
`;

export const SettingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
`;

export const SettingLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #cdd6f4;
`;

export const SettingDescription = styled.span`
  font-size: 12px;
  color: #6c7086;
`;

export const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 42px;
  height: 24px;
  flex-shrink: 0;
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background: #cba6f7;
  }

  &:checked + span::before {
    transform: translateX(18px);
  }
`;

export const ToggleSlider = styled.span`
  position: absolute;
  inset: 0;
  background: #45475a;
  border-radius: 24px;
  cursor: pointer;
  transition: background 0.2s;

  &::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    left: 3px;
    top: 3px;
    background: #cdd6f4;
    border-radius: 50%;
    transition: transform 0.2s;
  }
`;

export const Select = styled.select`
  background: #1e1e2e;
  border: 1px solid #45475a;
  border-radius: 6px;
  color: #cdd6f4;
  padding: 6px 10px;
  font-size: 13px;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #cba6f7;
  }
`;

export const SaveButton = styled.button`
  margin-top: 8px;
  background: #cba6f7;
  color: #1e1e2e;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.85;
  }
`;

export const SaveRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
`;
