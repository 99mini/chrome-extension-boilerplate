import styled from '@emotion/styled';

export const Panel = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 280px;
  background: #1e1e2e;
  color: #cdd6f4;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  font-family: system-ui, sans-serif;
  font-size: 14px;
  z-index: 2147483647;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #313244;
  cursor: pointer;
  user-select: none;
`;

export const HeaderTitle = styled.span`
  font-weight: 600;
  font-size: 13px;
  color: #cba6f7;
`;

export const ToggleBtn = styled.button`
  background: none;
  border: none;
  color: #cdd6f4;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  line-height: 1;
`;

export const Body = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.span`
  font-size: 11px;
  color: #6c7086;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const Value = styled.span`
  font-size: 13px;
  color: #a6e3a1;
  word-break: break-all;
`;

export const Divider = styled.div`
  height: 1px;
  background: #313244;
  margin: 4px 0;
`;

export const NoteInput = styled.textarea`
  width: 100%;
  background: #313244;
  border: 1px solid #45475a;
  border-radius: 6px;
  color: #cdd6f4;
  padding: 8px;
  font-size: 13px;
  resize: vertical;
  min-height: 60px;
  outline: none;
  box-sizing: border-box;
`;

export const SaveBtn = styled.button`
  background: #cba6f7;
  color: #1e1e2e;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
`;

export const SavedMsg = styled.div`
  font-size: 12px;
  color: #a6e3a1;
  text-align: center;
`;
