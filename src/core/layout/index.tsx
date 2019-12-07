import React, { useState, useCallback } from 'react';
import ErrorStatus from 'common/ErrorStatus';
import InfoStatus from 'common/InfoStatus';
import { LoadingBar } from 'common/LoadingBar';
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

const Error = ErrorStatus as any;
const Info = InfoStatus as any;

const Layout: React.FC = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(
    (window.matchMedia && !!window.matchMedia('(min-width: 600px)').matches) || false,
  );

  const [, setLoggedIn] = AuthContainer.useContainer();
  const [, logout] = useFlexgetAPI('/auth/logout', Method.Post);

  const handleLogout = async () => {
    const response = await logout();
    if (response?.ok) {
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
        <Error />
        <Info />
      </main>
    </div>
  );
};

export default Layout;
