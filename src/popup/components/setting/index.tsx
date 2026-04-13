import { Body, Container, Footer, Header, MenuButton, MenuIcon, MenuLabel, Subtitle, Title } from './setting.style';

export const Setting = () => {
  const openNewTab = () => {
    chrome.tabs.create({ url: 'chrome://newtab' });
  };

  const openOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <Container>
      <Header>
        <Title>Chrome Extension</Title>
        <Subtitle>Boilerplate</Subtitle>
      </Header>

      <Body>
        <MenuButton onClick={openNewTab}>
          <MenuIcon>🏠</MenuIcon>
          <MenuLabel>New Tab 열기</MenuLabel>
        </MenuButton>

        <MenuButton onClick={openOptions}>
          <MenuIcon>⚙️</MenuIcon>
          <MenuLabel>설정</MenuLabel>
        </MenuButton>
      </Body>

      <Footer>v1.0.0</Footer>
    </Container>
  );
};
