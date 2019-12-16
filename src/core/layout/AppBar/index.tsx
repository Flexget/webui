import React, { FC, useState, useCallback } from 'react';
import { useContainer } from 'unstated-next';
import { css } from '@emotion/core';
import { AppBar as MUIAppBar, Toolbar, IconButton, Typography, Theme } from '@material-ui/core';
import { ListAlt, Settings, CreateOutlined, Menu as MenuIcon } from '@material-ui/icons';
import { Spacer, Link } from 'common/styles';
import LoadingBar from 'core/status/LoadingBar';
import { AppBarContainer } from './hooks';
import Menu from './Menu';

const appbar = (theme: Theme) => css`
  color: ${theme.palette.primary.contrastText};

  ${theme.breakpoints.up('sm')} {
    min-height: ${theme.mixins.toolbar.minHeight};
  }
`;

interface Props {
  toggleSidebar: () => void;
  className?: string;
}

const AppBar: FC<Props> = ({ toggleSidebar, className }) => {
  const [{ title }] = useContainer(AppBarContainer);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();

  const handleSettingsClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget),
    [],
  );

  const handleSettingsClose = useCallback(() => setAnchorEl(undefined), []);

  return (
    <MUIAppBar position="static" css={appbar} className={className}>
      <Toolbar>
        <IconButton onClick={toggleSidebar} aria-label="toggle sidebar" color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          {title}
        </Typography>
        <Spacer />
        <IconButton aria-label="config editor" color="inherit" component={Link} to="/config">
          <CreateOutlined />
        </IconButton>
        <IconButton aria-label="log" color="inherit" component={Link} to="/log">
          <ListAlt />
        </IconButton>
        <IconButton aria-label="Manage" onClick={handleSettingsClick} color="inherit">
          <Settings />
        </IconButton>
        <Menu anchorEl={anchorEl} onClose={handleSettingsClose} />
      </Toolbar>
      <LoadingBar />
    </MUIAppBar>
  );
};

export default AppBar;
