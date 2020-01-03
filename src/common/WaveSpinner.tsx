import React from 'react';
import { keyframes, css } from '@emotion/core';
import { Theme } from '@material-ui/core';

const stretchDelay = keyframes`
  0%, 40%, 100% {
    transform: scaleY(0.4);
  }

  20% {
    transform: scaleY(1.0);
  }
`;

const spinner = css`
  margin: 10rem auto;
  width: 5rem;
  height: 4rem;
  text-align: center;
  font-size: 1rem;
`;

const rect1 = (theme: Theme) => css`
  background-color: ${theme.palette.primary.main};
  height: 100%;
  width: 0.6rem;
  display: inline-block;
  margin: 0.1rem;
  animation: ${stretchDelay} 1.2s infinite ease-in-out;
`;

const rect2 = (theme: Theme) => css`
  ${rect1(theme)};
  animation-delay: -1.1s;
`;

const rect3 = (theme: Theme) => css`
  ${rect1(theme)};
  animation-delay: -1s;
`;

const rect4 = (theme: Theme) => css`
  ${rect1(theme)};
  animation-delay: -0.9s;
`;

const rect5 = (theme: Theme) => css`
  ${rect1(theme)};
  animation-delay: -0.8s;
`;

const WaveSpinner = () => (
  <div css={spinner}>
    <div css={rect1} />
    <div css={rect2} />
    <div css={rect3} />
    <div css={rect4} />
    <div css={rect5} />
  </div>
);

export default WaveSpinner;
