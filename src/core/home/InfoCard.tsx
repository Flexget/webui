import React from 'react';
import { css } from '@emotion/core';
import {
  Card,
  CardContent,
  IconButton,
  CardHeader,
  CardActions,
  Theme,
  Link,
  Tooltip,
  Typography,
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

const cardHeader = (theme: Theme) => css`
  background-color: ${theme.palette.primary.main};
  color: ${theme.palette.primary.contrastText};
`;

const InfoCard = () => (
  <Card css={wrapper}>
    <CardHeader
      title="Flexget Web Interface"
      subheader="Under Development"
      css={cardHeader}
      titleTypographyProps={{
        color: 'inherit',
      }}
      subheaderTypographyProps={{
        color: 'inherit',
      }}
    />
    <CardContent>
      <p css={bold}>
        We need your help! If you are a React developer or can help with the layout/design/css then
        please join in the effort!
      </p>
      <Typography>
        This is the new webui written from the ground up in React and Typescript. lease report back
        to us on how well it works, issues, ideas etc...
      </Typography>
      <Typography>
        The new webui is very close to feature parity with v1. In the meantime, if v2 isn&apos;t
        suiting your needs you can add the following to your config:
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
        Then you can visit <Link href="/v1">/v1</Link> to access old webui
      </Typography>
      <Typography gutterBottom>
        There is a functional API with documentation available at <Link href="/api">/api</Link>
      </Typography>
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
    </CardContent>
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
  </Card>
);

export default InfoCard;
