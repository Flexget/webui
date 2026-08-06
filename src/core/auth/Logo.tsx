import { FC } from 'react';
import { css } from '@emotion/react';
import { Theme } from '@mui/material';
import headerImage from 'images/header.png';

export const logo = (theme: Theme) => css`
  background: transparent url(${headerImage}) no-repeat center;
  min-height: 9rem;
  background-size: 100% auto;
  margin: 0 1rem;
  ${theme.breakpoints.up('sm')} {
    background-size: auto;
  }
`;

const Logo: FC = () => <div css={logo} />;
export default Logo;
