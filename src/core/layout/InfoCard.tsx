import React, { FC } from 'react';
import { css } from '@emotion/core';
import {
  IconButton,
  CardActions,
  Theme,
  Link,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import { GitHub, ForumOutlined, Home, Chat } from '@material-ui/icons';
import YAML from 'yaml';

const bold = css`
  font-weight: bold;
`;

const wrapper = (theme: Theme) => css`
  margin: 0 auto;
  ${theme.breakpoints.up('sm')} {
    width: 50%;
  }
`;

const actions = css`
  justify-content: center;
`;

interface Props {
  open: boolean;
  onClose: () => void;
}

const InfoCard: FC<Props> = ({ open, onClose }) => (
  <Dialog css={wrapper} open={open} onClose={onClose}>
    <DialogTitle>Flexget Web Interface</DialogTitle>
    <DialogContent dividers>
      <Typography css={bold} gutterBottom>
        We need your help! If you are a React developer or can help with the layout/design/css then
        please join in the effort!
      </Typography>
      <Typography gutterBottom>
        This is the new webui written from the ground up in React and Typescript. Please report back
        to us on how well it works, issues, ideas etc...
      </Typography>
      <Typography gutterBottom>
        There is a functional API with documentation available at <Link href="/api">/api</Link>
      </Typography>
      <Typography>
        The new webui has feature parity with v1. But if for whatever reason, if v2 is not suiting{' '}
        your needs you can add the following to your config and then you can visit{' '}
        <Link href="/v1">/v1</Link> to access old webui.
      </Typography>
      <pre>
        {YAML.stringify({
          // eslint-disable-next-line @typescript-eslint/camelcase
          web_server: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            run_v1: true,
          },
        })}
      </pre>
      <Typography gutterBottom>
        More information:{' '}
        <Link href="http://flexget.com/Web-UI/v2" target="_blank" rel="noopener noreferrer">
          http://flexget.com/Web-UI/v2
        </Link>
      </Typography>
      <Typography gutterBottom>
        Chat:{' '}
        <Link href="https://flexget.com/Chat" target="_blank" rel="noopener noreferrer">
          https://flexget.com/Chat
        </Link>
      </Typography>
    </DialogContent>
    <CardActions css={actions}>
      <Tooltip title="Github">
        <IconButton
          aria-label="Github"
          href="https://github.com/Flexget/Flexget"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub />
        </IconButton>
      </Tooltip>
      <Tooltip title="Flexget.com">
        <IconButton
          aria-label="Flexget.com"
          href="https://flexget.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Home />
        </IconButton>
      </Tooltip>
      <Tooltip title="Chat">
        <IconButton
          aria-label="Chat"
          href="https://flexget.com/Chat"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Chat />
        </IconButton>
      </Tooltip>
      <Tooltip title="Forum">
        <IconButton
          aria-label="Forum"
          href="https://discuss.flexget.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ForumOutlined />
        </IconButton>
      </Tooltip>
    </CardActions>
  </Dialog>
);

export default InfoCard;
