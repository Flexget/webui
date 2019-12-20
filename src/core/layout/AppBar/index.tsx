import React, { FC, useState, useCallback, useMemo } from 'react';
import { useContainer } from 'unstated-next';
import { css } from '@emotion/core';
import {
  AppBar as MUIAppBar,
  Toolbar,
  IconButton,
  Typography,
  Theme,
  Tooltip,
} from '@material-ui/core';
import {
  EmojiObjects,
  EmojiObjectsOutlined,
  Menu as MenuIcon,
  ListAlt,
  CreateOutlined,
  Clear,
  Settings,
} from '@material-ui/icons';
import { Spacer, Link } from 'common/styles';
import LoadingBar from 'core/status/LoadingBar';
import { SpeedDialIcon } from '@material-ui/lab';
import { ThemeContainer } from 'core/theme';
import { AppBarContainer } from './hooks';
import Menu from './Menu';
import OverflowMenu from './OverflowMenu';

const appbar = (theme: Theme) => css`
  background-color: ${theme.palette.primary.main};
  color: ${theme.palette.primary.contrastText};
  min-height: ${theme.mixins.toolbar.minHeight};
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

  const menuClick = useMemo(() => (contextualMode ? handleContextualClose : toggleSidebar), [
    contextualMode,
    handleContextualClose,
    toggleSidebar,
  ]);

  const menuLabel = contextualMode ? 'close context' : 'toggle sidebar';
  const [mode, toggleMode] = ThemeContainer.useContainer();

  const LightMode = mode === 'light' ? EmojiObjects : EmojiObjectsOutlined;

  return (
    <MUIAppBar color="inherit" position="static" css={appbarStyles} className={className}>
      <Toolbar>
        <IconButton onClick={menuClick} aria-label={menuLabel} color="inherit">
          <SpeedDialIcon icon={<MenuIcon />} openIcon={<Clear />} open={contextualMode} />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          {contextualMode && contextualProps?.title ? contextualProps.title : title}
        </Typography>
        <Spacer />
        {contextualMode && !!contextualProps.icons ? (
          <OverflowMenu icons={contextualProps.icons} />
        ) : (
          <>
            <IconButton onClick={toggleMode} color="inherit" aria-label="toggle mode">
              <LightMode />
            </IconButton>
            <Tooltip title="Config Editor">
              <IconButton aria-label="config editor" color="inherit" component={Link} to="/config">
                <CreateOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="Log">
              <IconButton aria-label="log" color="inherit" component={Link} to="/log">
                <ListAlt />
              </IconButton>
            </Tooltip>
            <Tooltip title="Manage">
              <IconButton aria-label="Manage" onClick={handleSettingsClick} color="inherit">
                <Settings />
              </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorEl} onClose={handleSettingsClose} />
          </>
        )}
      </Toolbar>
      {content}
      <LoadingBar />
    </MUIAppBar>
  );
};

export default AppBar;
