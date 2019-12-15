import React, { FC } from 'react';
import { useContainer } from 'unstated-next';
import { Menu, MenuItem, ListItemIcon } from '@material-ui/core';
import { Sync, Storage, ExitToApp, PowerSettingsNew } from '@material-ui/icons';

import { AuthContainer } from 'core/auth/container';
import { useFlexgetAPI } from 'core/api';
import { useGlobalStatus } from 'core/status/hooks';
import { Method } from 'utils/fetch';
import { useOverlayState } from 'utils/hooks';
import ShutdownDialog from './ShutdownDialog';
import { useServerOperation } from './hooks';
import { Operation } from './types';

interface Props {
  anchorEl?: Element;
  onClose: () => void;
}

const NavMenu: FC<Props> = ({ anchorEl, onClose }) => {
  const [, setLoggedIn] = useContainer(AuthContainer);
  const [, request] = useFlexgetAPI('/auth/logout', Method.Post);
  const [shudownOpen, shudownActions] = useOverlayState();
  const [{ loading, error }, handleReloadClick] = useServerOperation(Operation.Reload, onClose);
  useGlobalStatus(loading, error);

  const logout = async () => {
    const response = await request();
    if (response.ok) {
      setLoggedIn(false);
    }
  };

  const handleShutdownClick = () => {
    shudownActions.open();
    onClose();
  };

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
        <MenuItem>
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
      <ShutdownDialog open={shudownOpen} onClose={shudownActions.close} />
    </>
  );
};

export default NavMenu;
