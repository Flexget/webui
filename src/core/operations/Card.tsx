import React, { FC, useCallback } from 'react';
import { CardActions, Button } from '@material-ui/core';
import { Sync, Storage, PowerSettingsNew } from '@material-ui/icons';

import { useGlobalStatus } from 'core/status/hooks';
import ShutdownDialog from 'core/operations/ShutdownDialog';
import { useServerOperation } from 'core/operations/hooks';
import Operations from 'core/operations/Operations';
import { ServerOperation } from 'core/operations/types';
import { useOverlayState } from 'utils/hooks';

const Card: FC = () => {
  const [isShutdownOpen, { open: openShutdown, close: closeShutdown }] = useOverlayState();
  const [isOpsOpen, { open: openOps, close: closeOps }] = useOverlayState();
  const [{ loading, error }, handleReloadClick] = useServerOperation(ServerOperation.Reload);
  useGlobalStatus(loading, error);

  const handleShutdownClick = useCallback(() => {
    openShutdown();
  }, [openShutdown]);

  const handleDatabaseClick = useCallback(() => {
    openOps();
  }, [openOps]);

  return (
    <>
      <CardActions>
        <Button onClick={handleReloadClick} disabled={loading} startIcon={<Sync />}>
          Reload
        </Button>
        <Button onClick={handleShutdownClick} startIcon={<PowerSettingsNew />}>
          Shutdown
        </Button>
        <Button onClick={handleDatabaseClick} startIcon={<Storage />}>
          Database
        </Button>
      </CardActions>
      <ShutdownDialog open={isShutdownOpen} onClose={closeShutdown} />
      <Operations open={isOpsOpen} onClose={closeOps} />
    </>
  );
};

export default Card;
