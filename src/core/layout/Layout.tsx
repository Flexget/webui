import React, { useMemo } from 'react';
import ErrorStatus from 'core/status/ErrorStatus';
import InfoStatus from 'core/status/InfoStatus';
import { useTheme } from '@material-ui/core';
import { useOverlayState } from 'utils/hooks';

import AppBar from './AppBar';
import SideNav from './SideNav';
import {
  header,
  wrapper,
  main,
  sidebar,
  content,
  leavingTransition,
  enterTransition,
} from './styles';
import { AppBarContainer } from './AppBar/hooks';

const Layout: React.FC = ({ children }) => {
  const theme = useTheme();
  const matches = window.matchMedia && !window.matchMedia('(max-width: 600px)').matches;
  const [sidebarOpen, { close, toggle }] = useOverlayState(matches);

  const sideTransition = sidebarOpen ? enterTransition : leavingTransition;
  const mainTransition = sidebarOpen ? leavingTransition : enterTransition;

  const contentCss = useMemo(() => [content(theme), mainTransition(theme)], [
    mainTransition,
    theme,
  ]);

  return (
    <AppBarContainer.Provider>
      <div css={wrapper}>
        <aside css={sidebar}>
          <SideNav css={sideTransition} sidebarOpen={sidebarOpen} onClose={close} />
        </aside>
        <header css={header}>
          <AppBar css={mainTransition} toggleSidebar={toggle} />
        </header>
        <main css={main}>
          <section css={contentCss}>{children}</section>
          <ErrorStatus />
          <InfoStatus />
        </main>
      </div>
    </AppBarContainer.Provider>
  );
};

export default Layout;
