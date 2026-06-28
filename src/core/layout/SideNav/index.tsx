import React, { FC, useCallback, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import {
  Drawer,
  List,
  Tooltip,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';
import { Settings } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { Route } from 'core/routes/types';
import { useGetRoutes } from 'core/routes/hooks';

import Menu from 'core/layout/SideNav/Menu';
import Version from './Version';
import Entry from './Entry';
import Logo from './Logo';
import {
  drawerOpen,
  drawerClose,
  drawer,
  logoWrapper,
  innerDrawer,
  divider,
  hideVersion,
} from './styles';

interface Props {
  sidebarOpen?: boolean;
  onClose: () => void;
  className?: string;
}

const SideNav: FC<Props> = ({ sidebarOpen = false, onClose, className }) => {
  const { routes } = useGetRoutes();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const drawerCss = useMemo(
    () => (sidebarOpen ? drawerOpen(theme) : drawerClose(theme)),
    [sidebarOpen, theme],
  );

  const drawerRootCss = useMemo(() => [drawer(theme), drawerCss], [drawerCss, theme]);

  const handleClick = useCallback(
    ({ path }: Route) =>
      () => {
        if (isMobile) {
          onClose();
        }
        navigate(path);
      },
    [navigate, isMobile, onClose],
  );

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();

  const handleSettingsClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget),
    [],
  );

  const handleSettingsClose = useCallback(() => setAnchorEl(undefined), []);

  return (
    <Drawer
      css={drawerRootCss}
      className={className}
      open={sidebarOpen}
      variant={isMobile ? 'temporary' : 'permanent'}
      onClose={onClose}
    >
      <div css={logoWrapper}>
        <Logo sidebarOpen={sidebarOpen} className={className} />

        <Tooltip title="Manage">
          <IconButton aria-label="Manage" onClick={handleSettingsClick} color="inherit">
            <Settings />
          </IconButton>
        </Tooltip>
        <Menu anchorEl={anchorEl} onClose={handleSettingsClose} />
      </div>
      <div css={innerDrawer}>
        <List
          component="nav"
          css={css`
            width: inherit;
          `}
        >
          {routes.map(route => (
            <Entry key={route.path} onClick={handleClick(route)} {...route} />
          ))}
        </List>
        <div>
          <Divider css={divider} />
          <Version css={!sidebarOpen && hideVersion} className={className} />
        </div>
      </div>
    </Drawer>
  );
};

export default SideNav;
