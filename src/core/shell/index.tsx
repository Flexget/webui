import * as React from 'react';
import ErrorStatus from 'common/ErrorStatus';
import InfoStatus from 'common/InfoStatus';
import {
  header,
  wrapper,
  logoWrapper,
  nav,
  main,
  sideBar,
  contentWithSidebar,
  content,
} from './styles';

const { useState, useCallback } = React;

const Layout: React.FC = ({ children }) => {
  const [sideBarOpen, setSidebarOpen] = useState(
    (window.matchMedia && !!window.matchMedia('(min-width: 600px)').matches) || false,
  );

  const toggleSideBar = useCallback(() => setSidebarOpen(open => !open), [setSidebarOpen]);

  const contentCssFn = useCallback(() => contentWithSidebar(sideBarOpen), [sideBarOpen]);

  return (
    <div css={wrapper}>
      <header css={header}>
        <div css={logoWrapper}>
          <Logo sideBarOpen={sideBarOpen} />
        </div>
        <nav css={nav}>
          <Navbar toggle={toggleSideBar} />
          <LoadingBar />
        </nav>
      </header>
      <main css={main}>
        <aside css={sideBar}>
          <SideNav sideBarOpen={sideBarOpen} toggle={toggleSideBar} />
        </aside>
        <section css={[content, contentCssFn()]}>{children}</section>
        <ErrorStatus />
        <InfoStatus />
      </main>
    </div>
  );
};

export default Layout;
