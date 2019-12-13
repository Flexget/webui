import React, { useState, useCallback } from 'react';
import ErrorStatus from 'core/status/ErrorStatus';
import InfoStatus from 'core/status/InfoStatus';
import LoadingBar from 'core/status/LoadingBar';
import { AuthContainer } from 'core/auth/container';
import { useFlexgetAPI } from 'core/api';
import { Method } from 'utils/fetch';
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

  const [, setLoggedIn] = AuthContainer.useContainer();
  const [, logout] = useFlexgetAPI('/auth/logout', Method.Post);

  const handleLogout = async () => {
    const response = await logout();
    if (response.ok) {
      setLoggedIn(false);
    }
  };

  const toggleSidebar = useCallback(() => setSidebarOpen(open => !open), []);

  const contentCssFn = useCallback(() => contentWithSidebar(sidebarOpen), [sidebarOpen]);

  return (
    <div css={wrapper}>
      <header css={header}>
        <div css={logoWrapper}>
          <Logo sidebarOpen={sidebarOpen} />
        </div>
        <nav css={nav}>
          <Navbar toggle={toggleSidebar} logout={handleLogout} />
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
