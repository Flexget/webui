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
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import ForumIcon from '@material-ui/icons/ForumOutlined';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';

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
      <p>The interface is not yet ready for end users. Consider this preview only state.</p>
      <p>
        If you still use it anyways, please report back to us on how well it works, issues, ideas
        etc...
      </p>
      <p>
        There is a functional API with documentation available at <Link href="/api">/api</Link>
      </p>
      <p>
        More information:{' '}
        <Link href="http://flexget.com/Web-UI/v2" target="_blank" rel="noopener noreferrer">
          http://flexget.com/Web-UI/v2
        </Link>
      </p>
      <p>
        Chat:{' '}
        <Link href="https://flexget.com/Chat" target="_blank" rel="noopener noreferrer">
          https://flexget.com/Chat
        </Link>
      </p>
    </CardContent>
    <CardActions css={actions}>
      <Tooltip title="Github">
        <IconButton
          aria-label="Github"
          href="https://github.com/Flexget/Flexget"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Flexget.com">
        <IconButton
          aria-label="Flexget.com"
          href="https://flexget.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <HomeIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Chat">
        <IconButton
          aria-label="Chat"
          href="https://flexget.com/Chat"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ChatIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Forum">
        <IconButton
          aria-label="Forum"
          href="https://discuss.flexget.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ForumIcon />
        </IconButton>
      </Tooltip>
    </CardActions>
  </Card>
);

export default InfoCard;
