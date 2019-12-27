import React, { FC } from 'react';
import { css } from '@emotion/core';
import { Theme } from '@material-ui/core';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { PostAdd, PlaylistAdd } from '@material-ui/icons';
import { useOverlayState } from 'utils/hooks';
import AddEntryDialog from './AddEntryDialog';
import AddListDialog from './AddListDialog';

const speedDialCss = (theme: Theme) => css`
  position: absolute;
  bottom: ${theme.typography.pxToRem(theme.spacing(2))};
  right: ${theme.typography.pxToRem(theme.spacing(2))};
`;

const AddFab: FC = () => {
  const [isSpeedDialOpen, { close: speedDialClose, open: speedDialOpen }] = useOverlayState();
  const [isAddListOpen, { close: addListClose, open: addListOpen }] = useOverlayState();
  const [isAddEntryOpen, { close: addEntryClose, open: addEntryOpen }] = useOverlayState();

  return (
    <>
      <SpeedDial
        ariaLabel="Add"
        onClose={speedDialClose}
        open={isSpeedDialOpen}
        css={speedDialCss}
        icon={<SpeedDialIcon />}
        onOpen={speedDialOpen}
      >
        <SpeedDialAction icon={<PostAdd />} tooltipTitle="Add Entry" onClick={addEntryOpen} />
        <SpeedDialAction icon={<PlaylistAdd />} tooltipTitle="Add List" onClick={addListOpen} />
      </SpeedDial>
      <AddEntryDialog open={isAddEntryOpen} onClose={addEntryClose} />
      <AddListDialog open={isAddListOpen} onClose={addListClose} />
    </>
  );
};

export default AddFab;
