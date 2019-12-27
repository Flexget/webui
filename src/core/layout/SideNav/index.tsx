import React, { FC, useCallback, useReducer, useMemo, useState } from 'react';
import { useContainer } from 'unstated-next';
import { css } from '@emotion/core';
import {
  Drawer,
  List,
  Collapse,
  Tooltip,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
} from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import { RouteContainer } from 'core/routes/hooks';
import { useHistory } from 'react-router';
import { Route } from 'core/routes/types';
import Version from './Version';
import Entry from './Entry';
import Logo from './Logo';
import Menu from './Menu';
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
  const [routes] = useContainer(RouteContainer);
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [openMap, setOpen] = useReducer(
    (state: Record<string, boolean>, name: string) => ({
      ...state,
      [name]: !state[name],
    }),
    {},
  );

  const drawerCss = useMemo(() => (sidebarOpen ? drawerOpen(theme) : drawerClose(theme)), [
    sidebarOpen,
    theme,
  ]);

  const drawerRootCss = useMemo(() => [drawer(theme), drawerCss], [drawerCss, theme]);

  const handleClick = useCallback(
    ({ path, name }: Route) => () => {
      if (path) {
        if (isMobile) {
          onClose();
        }
        history.push(path);
        return;
      }
      setOpen(name);
      if (!sidebarOpen) {
        onClose();
      }
    },
    [history, isMobile, onClose, sidebarOpen],
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
          {routes.flatMap(({ children, ...route }) => [
            <Entry key={route.path} onClick={handleClick(route)} {...route} />,
            children && (
              <Collapse in={openMap[route.name]} timeout="auto" unmountOnExit key={route.name}>
                {children.map(child => (
                  <Entry key={child.path} onClick={handleClick(child)} {...child} />
                ))}
              </Collapse>
            ),
          ])}
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
