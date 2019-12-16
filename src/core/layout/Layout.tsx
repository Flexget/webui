import React, { useMemo } from 'react';
import ErrorStatus from 'core/status/ErrorStatus';
import InfoStatus from 'core/status/InfoStatus';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { useOverlayState } from 'utils/hooks';

import Logo from './Logo';
import AppBar from './AppBar';
import SideNav from './SideNav';
import {
  header,
  wrapper,
  logoWrapper,
  main,
  sidebar,
  contentWithSidebar,
  content,
  leavingTransition,
  enterTransition,
} from './styles';
import { AppBarContainer } from './AppBar/hooks';

const Layout: React.FC = ({ children }) => {
  const theme = useTheme();
  const matches = window.matchMedia && !window.matchMedia('(max-width: 600px)').matches;
  const [sidebarOpen, { toggle, close }] = useOverlayState(matches);

  const enterCss = useMemo(() => [enterTransition(theme)], [theme]);
  const leavingCss = useMemo(() => [leavingTransition(theme)], [theme]);

  const contentCss = useMemo(() => [content(theme), sidebarOpen && contentWithSidebar(theme)], [
    sidebarOpen,
    theme,
  ]);

  const sideTransition = sidebarOpen ? enterCss : leavingCss;
  const mainTransition = sidebarOpen ? leavingCss : enterCss;

  return (
    <AppBarContainer.Provider>
      <div css={wrapper}>
        <div css={logoWrapper}>
          <Logo css={sideTransition} sidebarOpen={sidebarOpen} />
        </div>
        <aside css={sidebar}>
          <SideNav css={sideTransition} sidebarOpen={sidebarOpen} onClose={close} />
        </aside>
        <header css={header}>
          <AppBar css={mainTransition} toggleSidebar={toggle} />
        </header>
        <main css={main}>
          <section css={[contentCss, mainTransition]}>{children}</section>
          <ErrorStatus />
          <InfoStatus />
        </main>
      </div>
    </AppBarContainer.Provider>
  );
};

export default Layout;
