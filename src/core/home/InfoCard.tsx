import React from 'react';
import { css } from '@emotion/core';
import { Card, CardContent, IconButton, CardHeader, CardActions } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import ForumIcon from '@material-ui/icons/ForumOutlined';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import theme from 'core/theme';
import { backgroundColor } from 'common/styles';

const bold = css`
  font-weight: bold;
`;

const wrapper = css`
  margin: 0 auto;
  ${theme.breakpoints.up('sm')} {
    width: 50%;
  }
`;

const actions = css`
  justify-content: center;
`;

const InfoCard = () => (
  <Card css={wrapper}>
    <CardHeader
      title="Flexget Web Interface"
      subheader="Under Development"
      css={backgroundColor(theme.palette.primary[800])}
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
        There is a functional API with documentation available at <a href="/api">/api</a>
      </p>
      <p>
        More information:{' '}
        <a href="http://flexget.com/Web-UI/v2" target="_blank" rel="noopener noreferrer">
          http://flexget.com/Web-UI/v2
        </a>
      </p>
      <p>
        Chat:{' '}
        <a href="https://flexget.com/Chat" target="_blank" rel="noopener noreferrer">
          https://flexget.com/Chat
        </a>
      </p>
    </CardContent>
    <CardActions css={actions}>
      <IconButton
        aria-label="Github"
        href="https://github.com/Flexget/Flexget"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon />
      </IconButton>
      <IconButton
        aria-label="Flexget.com"
        href="https://flexget.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <HomeIcon />
      </IconButton>
      <IconButton
        aria-label="Chat"
        href="https://flexget.com/Chat"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ChatIcon />
      </IconButton>
      <IconButton
        aria-label="Forum"
        href="https://discuss.flexget.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ForumIcon />
      </IconButton>
    </CardActions>
  </Card>
);

export default InfoCard;
