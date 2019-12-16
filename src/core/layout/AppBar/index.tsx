import React, { FC, useState, useCallback } from 'react';
import { useContainer } from 'unstated-next';
import { css } from '@emotion/core';
import { AppBar as MUIAppBar, Toolbar, IconButton, Typography, Theme } from '@material-ui/core';
import { MoreVert, Menu as MenuIcon, ListAlt, CreateOutlined, Clear } from '@material-ui/icons';
import { Spacer, Link } from 'common/styles';
import LoadingBar from 'core/status/LoadingBar';
import { AppBarContainer } from './hooks';
import Menu from './Menu';

const appbar = (theme: Theme) => css`
  background-color: ${theme.palette.primary.main};
  color: ${theme.palette.primary.contrastText};

  ${theme.breakpoints.up('sm')} {
    min-height: ${theme.mixins.toolbar.minHeight};
  }
`;

const contextualAppBar = (theme: Theme) => css`
  background-color: ${theme.palette.secondary.dark};
  color: ${theme.palette.secondary.contrastText};
`;

interface Props {
  toggleSidebar: () => void;
  className?: string;
}

const AppBar: FC<Props> = ({ toggleSidebar, className }) => {
  const [
    { title, content, contextualMode, contextualProps = {} },
    { setContextual },
  ] = useContainer(AppBarContainer);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();

  const handleSettingsClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget),
    [],
  );

  const appbarStyles = useCallback(
    (theme: Theme) => [appbar(theme), contextualMode && contextualAppBar(theme)],
    [contextualMode],
  );

  const handleSettingsClose = useCallback(() => setAnchorEl(undefined), []);

  const handleContextualClose = useCallback(() => {
    if (contextualProps?.onClose) {
      contextualProps.onClose();
    }
    setContextual(false);
  }, [contextualProps, setContextual]);

  return (
    <MUIAppBar color="inherit" position="static" css={appbarStyles} className={className}>
      <Toolbar>
        {contextualMode ? (
          <IconButton onClick={handleContextualClose} aria-label="close context" color="inherit">
            <Clear />
          </IconButton>
        ) : (
          <IconButton onClick={toggleSidebar} aria-label="toggle sidebar" color="inherit">
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" color="inherit" noWrap>
          {contextualMode && contextualProps?.title ? contextualProps.title : title}
        </Typography>
        <Spacer />
        {contextualMode && !!contextualProps.icons ? (
          contextualProps.icons?.map(({ name, Icon, onClick }) => (
            <IconButton aria-label={name} onClick={onClick} color="inherit">
              <Icon />
            </IconButton>
          ))
        ) : (
          <>
            <IconButton aria-label="config editor" color="inherit" component={Link} to="/config">
              <CreateOutlined />
            </IconButton>
            <IconButton aria-label="log" color="inherit" component={Link} to="/log">
              <ListAlt />
            </IconButton>
          </>
        )}
        <IconButton aria-label="Manage" onClick={handleSettingsClick} color="inherit">
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl} onClose={handleSettingsClose} />
      </Toolbar>
      {content}
      <LoadingBar />
    </MUIAppBar>
  );
};

export default AppBar;
