import React, { FC, useCallback } from 'react';
import { useContainer } from 'unstated-next';
import { Menu, MenuItem, ListItemIcon } from '@material-ui/core';
import { Sync, Storage, ExitToApp, PowerSettingsNew } from '@material-ui/icons';

import { AuthContainer } from 'core/auth/hooks';
import { useFlexgetAPI } from 'core/api';
import { useGlobalStatus } from 'core/status/hooks';
import { Method } from 'utils/fetch';
import { useOverlayState } from 'utils/hooks';
import ShutdownDialog from './ShutdownDialog';
import { useServerOperation, ServerOperation } from './hooks';
import Operations from './Operations';

interface Props {
  anchorEl?: Element;
  onClose: () => void;
}

const NavMenu: FC<Props> = ({ anchorEl, onClose }) => {
  const [, setLoggedIn] = useContainer(AuthContainer);
  const [, request] = useFlexgetAPI('/auth/logout', Method.Post);
  const [isShutdownOpen, { open: openShutdown, close: closeShutdown }] = useOverlayState();
  const [isOpsOpen, { open: openOps, close: closeOps }] = useOverlayState();
  const [{ loading, error }, handleReloadClick] = useServerOperation(
    ServerOperation.Reload,
    onClose,
  );
  useGlobalStatus(loading, error);

  const logout = useCallback(async () => {
    const response = await request();
    if (response.ok) {
      setLoggedIn(false);
    }
  }, [request, setLoggedIn]);

  const handleShutdownClick = useCallback(() => {
    openShutdown();
    onClose();
  }, [onClose, openShutdown]);

  const handleDatabaseClick = useCallback(() => {
    openOps();
    onClose();
  }, [onClose, openOps]);

  return (
    <>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={onClose}>
        <MenuItem onClick={handleReloadClick} disabled={loading}>
          <ListItemIcon>
            <Sync />
          </ListItemIcon>
          Reload
        </MenuItem>
        <MenuItem onClick={handleShutdownClick}>
          <ListItemIcon>
            <PowerSettingsNew />
          </ListItemIcon>
          Shutdown
        </MenuItem>
        <MenuItem onClick={handleDatabaseClick}>
          <ListItemIcon>
            <Storage />
          </ListItemIcon>
          Database
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <ShutdownDialog open={isShutdownOpen} onClose={closeShutdown} />
      <Operations open={isOpsOpen} onClose={closeOps} />
    </>
  );
};

export default NavMenu;
