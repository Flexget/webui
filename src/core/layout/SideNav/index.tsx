import React, { FC, useCallback, useReducer, useMemo } from 'react';
import { useContainer } from 'unstated-next';
import { css } from '@emotion/core';
import { Drawer, List, Collapse, useMediaQuery, useTheme, Theme } from '@material-ui/core';
import { RouteContainer } from 'core/routes/hooks';
import { useHistory } from 'react-router';
import { Route } from 'core/routes/types';
import Version from './Version';
import Entry from './Entry';

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
  width: 100vw;

  ${theme.breakpoints.up('sm')} {
    width: 19rem;
  }
`;

const drawerClose = (theme: Theme) => css`
  width: 0;

  ${theme.breakpoints.up('sm')} {
    width: 6rem;
  }
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

interface Props {
  sidebarOpen?: boolean;
  onClose: () => void;
  className?: string;
}

const SideNav: FC<Props> = ({ sidebarOpen = false, onClose, className }) => {
  const [routes] = useContainer(RouteContainer);
  const history = useHistory();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
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
        if (matches) {
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
    [history, matches, onClose, sidebarOpen],
  );

  return (
    <Drawer css={drawerRootCss} className={className} open={sidebarOpen} variant="permanent">
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
        <Version css={!sidebarOpen && hideVersion} className={className} />
      </div>
    </Drawer>
  );
};

export default SideNav;
