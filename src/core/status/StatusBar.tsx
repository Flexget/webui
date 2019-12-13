import React, { FC } from 'react';
import SnackBar from '@material-ui/core/Snackbar';

interface Props {
  message?: string;
  clearStatus: () => void;
}

const StatusBar: FC<Props> = ({ message = '', clearStatus }) => (
  <SnackBar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    open={!!message}
    autoHideDuration={6000}
    onClose={clearStatus}
    ContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{message}</span>}
  />
);

export default StatusBar;
