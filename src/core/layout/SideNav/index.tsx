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
  Theme,
  Divider,
} from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import { RouteContainer } from 'core/routes/hooks';
import { useHistory } from 'react-router';
import { Route } from 'core/routes/types';
import { rgba } from 'polished';
import Version from './Version';
import Entry from './Entry';
import Logo from './Logo';
import Menu from './Menu';

export const nested = (theme: Theme) => css`
  padding-left: ${theme.spacing(0.4)}rem;
`;

const innerDrawer = css`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const drawerOpen = (theme: Theme) => css`
  width: ${theme.typography.pxToRem(theme.mixins.sidebar.width.open)};
  ${theme.breakpoints.up('sm')} {
    width: ${theme.typography.pxToRem(theme.mixins.sidebar.width.open)};
  }
`;

const drawerClose = (theme: Theme) => css`
  ${theme.breakpoints.up('sm')} {
    width: ${theme.typography.pxToRem(theme.mixins.sidebar.width.closed)};
  }
`;

const divider = (theme: Theme) => css`
  background-color: ${rgba(theme.palette.secondary.light, 0.15)};
  border-bottom-color: ${theme.palette.secondary.light};
`;

const paper = css`
  width: inherit;
  background-color: inherit;
  border-right: none !important;
  position: relative;
`;

const drawer = (theme: Theme) => css`
  background-color: ${theme.palette.secondary.main};
  width: 0;
  height: 100%;
  white-space: nowrap;

  & .MuiDrawer-paper {
    ${paper}
  }

  ${theme.breakpoints.up('sm')} {
    width: 6rem;
  }
`;

const hideVersion = css`
  opacity: 0;
`;

const logoWrapper = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  color: ${theme.palette.secondary.light};
`;

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
