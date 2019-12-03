import React, { useState, useCallback } from 'react';
import ErrorStatus from 'common/ErrorStatus';
import InfoStatus from 'common/InfoStatus';
import { LoadingBar } from 'common/LoadingBar';
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
  const [sidebarOpen, setSidebarOpen] = useState(
    (window.matchMedia && !!window.matchMedia('(min-width: 600px)').matches) || false,
  );

  const toggleSidebar = useCallback(() => setSidebarOpen(open => !open), []);

  const contentCssFn = useCallback(() => contentWithSidebar(sidebarOpen), [sidebarOpen]);

  return (
    <div css={wrapper}>
      <header css={header}>
        <div css={logoWrapper}>
          <Logo sidebarOpen={sidebarOpen} />
        </div>
        <nav css={nav}>
          <Navbar toggle={toggleSidebar} />
          <LoadingBar />
        </nav>
      </header>
      <main css={main}>
        <aside css={sidebar}>
          <SideNav sideBarOpen={sidebarOpen} toggle={toggleSidebar} />
        </aside>
        <section css={[content, contentCssFn()]}>{children}</section>
        <ErrorStatus />
        <InfoStatus />
      </main>
    </div>
  );
};

export default Layout;
