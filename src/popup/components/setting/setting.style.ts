import styled from '@emotion/styled';

export const Container = styled.div`
  width: 280px;
  background: #1e1e2e;
  color: #cdd6f4;
  font-family: system-ui, sans-serif;
  font-size: 14px;
`;

export const Header = styled.div`
  padding: 16px;
  background: #313244;
  border-bottom: 1px solid #45475a;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #cba6f7;
`;

export const Subtitle = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  color: #6c7086;
`;

export const Body = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MenuButton = styled.button`
  width: 100%;
  background: #313244;
  border: 1px solid #45475a;
  border-radius: 8px;
  color: #cdd6f4;
  padding: 10px 14px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;

  &:hover {
    background: #45475a;
  }
`;

export const MenuIcon = styled.span`
  font-size: 16px;
  line-height: 1;
`;

export const MenuLabel = styled.span`
  flex: 1;
`;

export const Footer = styled.div`
  padding: 10px 16px;
  border-top: 1px solid #313244;
  font-size: 11px;
  color: #585b70;
  text-align: center;
`;
