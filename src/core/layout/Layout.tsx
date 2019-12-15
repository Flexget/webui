import React, { useCallback } from 'react';
import ErrorStatus from 'core/status/ErrorStatus';
import InfoStatus from 'core/status/InfoStatus';
import LoadingBar from 'core/status/LoadingBar';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useOverlayState } from 'utils/hooks';
import Logo from './Logo';
import Navbar from './Navbar';
import SideNav from './SideNav';
import {
  header,
  wrapper,
  logoWrapper,
  nav,
  main,
  sidebar,
  contentWithSidebar,
  content,
} from './styles';

const Layout: React.FC = ({ children }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [sidebarOpen, { toggle, close }] = useOverlayState(matches);

  const contentCssFn = useCallback(() => contentWithSidebar(sidebarOpen), [sidebarOpen]);

  return (
    <div css={wrapper}>
      <header css={header}>
        <div css={logoWrapper}>
          <Logo sidebarOpen={sidebarOpen} />
        </div>
        <nav css={nav}>
          <Navbar toggleSidebar={toggle} />
          <LoadingBar />
        </nav>
      </header>
      <main css={main}>
        <aside css={sidebar}>
          <SideNav sidebarOpen={sidebarOpen} onClose={close} />
        </aside>
        <section css={[content, contentCssFn()]}>{children}</section>
        <ErrorStatus />
        <InfoStatus />
      </main>
    </div>
  );
};

export default Layout;
