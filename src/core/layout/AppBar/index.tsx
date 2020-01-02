import React, { FC, useCallback, useMemo } from 'react';
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
import { EmojiObjects, EmojiObjectsOutlined, Menu as MenuIcon, Clear } from '@material-ui/icons';
import { Spacer } from 'common/styles';
import LoadingBar from 'core/status/LoadingBar';
import { SpeedDialIcon } from '@material-ui/lab';
import { ThemeContainer } from 'core/theme';
import { AppBarContainer } from './hooks';
import OverflowMenu from './OverflowMenu';

const appbar = (theme: Theme) => css`
  background-color: ${theme.palette.primary.main};
  color: ${theme.palette.primary.contrastText};
  min-height: ${theme.typography.pxToRem(theme.mixins.appBar.minHeight)};
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
    {
      title,
      content,
      contextualMode,
      contextualProps = {},
      menuProps,
      icon = {
        Component: MenuIcon,
        onClick: toggleSidebar,
        label: 'toggle sidebar',
      },
    },
    { setContextual },
  ] = useContainer(AppBarContainer);

  const appbarStyles = useCallback(
    (theme: Theme) => [appbar(theme), contextualMode && contextualAppBar(theme)],
    [contextualMode],
  );

  const handleContextualClose = useCallback(() => {
    if (contextualProps?.onClose) {
      contextualProps.onClose();
    }
    setContextual(false);
  }, [contextualProps, setContextual]);

  const menuClick = useMemo(() => (contextualMode ? handleContextualClose : icon.onClick), [
    contextualMode,
    handleContextualClose,
    icon.onClick,
  ]);

  const menuLabel = contextualMode ? 'close context' : icon.label;
  const [mode, toggleMode] = useContainer(ThemeContainer);

  const LightMode = mode === 'light' ? EmojiObjects : EmojiObjectsOutlined;
  const overflowMenuProps =
    contextualMode && contextualProps.menuItems ? contextualProps.menuItems : menuProps;

  return (
    <MUIAppBar color="inherit" position="static" css={appbarStyles} className={className}>
      <Toolbar>
        <IconButton onClick={menuClick} aria-label={menuLabel} color="inherit">
          <SpeedDialIcon icon={<icon.Component />} openIcon={<Clear />} open={contextualMode} />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          {contextualMode && contextualProps?.title ? contextualProps.title : title}
        </Typography>
        <Spacer />
        <Tooltip title={mode === 'light' ? 'Dark Mode' : 'Light Mode'}>
          <IconButton onClick={toggleMode} color="inherit" aria-label="toggle mode">
            <LightMode />
          </IconButton>
        </Tooltip>
        {!!overflowMenuProps && <OverflowMenu icons={overflowMenuProps} />}
      </Toolbar>
      {content}
      <LoadingBar />
    </MUIAppBar>
  );
};

export default AppBar;
