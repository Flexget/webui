import React, { FC, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useContainer } from 'unstated-next';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import theme from 'theme';
import { backgroundColor, Spacer } from 'common/styles';

import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { ListAlt, Settings, CreateOutlined, Menu as MenuIcon } from '@material-ui/icons';
import { NavbarContainer } from './hooks';
import Menu from './Menu';

const NavIcon = styled(IconButton)`
  color: ${theme.palette.getContrastText(theme.palette.primary[800])};
`;

const toolbar = css`
  ${backgroundColor(theme.palette.primary[800])};
  min-height: 5rem;
`;

interface Props {
  toggleSidebar: () => void;
}

const Navbar: FC<Props> = ({ toggleSidebar }) => {
  const [{ title }] = useContainer(NavbarContainer);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();

  const handleSettingsClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget),
    [],
  );

  const handleSettingsClose = useCallback(() => setAnchorEl(undefined), []);

  return (
    <AppBar position="static">
      <Toolbar css={toolbar} variant="dense">
        <NavIcon onClick={toggleSidebar} aria-label="toggle sidebar">
          <MenuIcon />
        </NavIcon>
        <Typography variant="h6" color="inherit" noWrap>
          {title}
        </Typography>
        <Spacer />
        <Link to="/config">
          <NavIcon aria-label="config editor">
            <CreateOutlined />
          </NavIcon>
        </Link>
        <Link to="/log">
          <NavIcon aria-label="log">
            <ListAlt />
          </NavIcon>
        </Link>
        <NavIcon aria-label="Manage" onClick={handleSettingsClick}>
          <Settings />
        </NavIcon>
        <Menu anchorEl={anchorEl} onClose={handleSettingsClose} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
