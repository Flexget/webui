import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import { Theme } from '@material-ui/core';
import { css } from '@emotion/core';
import { NoPaddingWrapper } from 'common/styles';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { ListContainer } from './hooks/list';
import Entries from './Entries';

export const content = (theme: Theme) => css`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.typography.pxToRem(theme.spacing(1))};

  ${theme.breakpoints.up('sm')} {
    padding: ${theme.typography.pxToRem(theme.spacing(2))};
  }
`;

const PendingList: FC<{}> = () => {
  useInjectPageTitle('Pending List');

  return (
    <ListContainer.Provider>
      <NoPaddingWrapper>
        <div css={content}>
          <Entries />
        </div>
      </NoPaddingWrapper>
    </ListContainer.Provider>
  );
};

export default hot(PendingList);
