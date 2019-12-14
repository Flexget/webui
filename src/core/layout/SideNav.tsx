import React, { FC, useCallback, useReducer } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Drawer, List, Collapse, useMediaQuery } from '@material-ui/core';
import theme from 'theme';
import SideNavEntry from 'core/layout/SideNavEntry';
import Version from 'core/layout/Version';
import { RouteContainer } from 'core/routes/hooks';
import { useHistory } from 'react-router';
import { Route } from 'core/routes/types';

export const nested = css`
  padding-left: ${theme.spacing(0.4)}rem;
`;

const NavDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    position: relative;
    background-color: ${theme.palette.secondary[900]};
    height: calc(100vh - 10rem);
    width: ${({ open }) => (open ? '100vw' : 0)};
    transition: ${theme.transitions.create('width')};
    border-right: none !important;

    ${theme.breakpoints.up('sm')} {
      height: calc(100vh - 5rem);
      width: ${({ open }) => (open ? '19rem' : '6rem')};
    }
  }
`;

const innerDrawer = css`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const hideVersion = css`
  display: none;
`;

interface Props {
  sideBarOpen?: boolean;
  toggle: () => void;
}

const SideNav: FC<Props> = ({ sideBarOpen = false, toggle }) => {
  const [routes] = RouteContainer.useContainer();
  const history = useHistory();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useReducer(
    (state: Record<string, boolean>, name: string) => ({
      ...state,
      [name]: !state[name],
    }),
    {},
  );

  const handleClick = useCallback(
    ({ path, name }: Route) => () => {
      if (path) {
        if (matches) {
          toggle();
        }
        history.push(path);
        return;
      }
      setOpen(name);
      if (!sideBarOpen) {
        toggle();
      }
    },
    [history, matches, sideBarOpen, toggle],
  );

  return (
    <NavDrawer open={sideBarOpen} variant="permanent">
      <div css={innerDrawer}>
        <List
          css={css`
            width: inherit;
          `}
        >
          {routes.flatMap(({ children, ...route }) => [
            <SideNavEntry key={route.path} onClick={handleClick(route)} {...route} />,
            children && (
              <Collapse in={open[route.name]} timeout="auto" unmountOnExit key={route.name}>
                {children.map(child => (
                  <SideNavEntry key={child.path} onClick={handleClick(child)} {...child} />
                ))}
              </Collapse>
            ),
          ])}
        </List>
        <Version css={!open && hideVersion} />
      </div>
    </NavDrawer>
  );
};

export default SideNav;
