import React, { FC } from 'react';
import { CircularProgress } from '@material-ui/core';
import { css } from '@emotion/core';

const spinner = css`
  margin: 0 auto;
`;

const wrapper = css`
  display: flex;
  align-items: center;
`;

interface Props {
  loading?: boolean;
}

const LoadingSpinner: FC<Props> = ({ loading = false }) => {
  if (loading) {
    return (
      <div css={wrapper}>
        <CircularProgress css={spinner} />
      </div>
    );
  }
  return null;
};

export default LoadingSpinner;
