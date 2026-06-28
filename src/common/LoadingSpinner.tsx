import React, { FC } from 'react';
import { CircularProgress } from '@mui/material';
import { css } from '@emotion/react';

const spinner = css`
  margin: 0 auto;
`;

const wrapper = css`
  display: flex;
  align-items: center;
  width: inherit;
  height: inherit;
`;

interface Props {
  loading?: boolean;
  children?: React.ReactNode;
}

const LoadingSpinner: FC<Props> = ({ loading = true, children }) => {
  if (loading) {
    return (
      <div css={wrapper}>
        <CircularProgress css={spinner} />
      </div>
    );
  }
  return <>{children}</>;
};

export default LoadingSpinner;
