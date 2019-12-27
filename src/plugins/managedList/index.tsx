import React, { FC } from 'react';
import { Theme } from '@material-ui/core';
import { css } from '@emotion/core';
import { NoPaddingWrapper } from 'common/styles';
import { ListContainer } from './hooks/list';
import Entries from './Entries';
import { Entry } from './types';

export const content = (theme: Theme) => css`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.typography.pxToRem(theme.spacing(1))};

  ${theme.breakpoints.up('sm')} {
    padding: ${theme.typography.pxToRem(theme.spacing(2))};
  }
`;

const ManagedList: FC = <T extends Entry>() => (
  <ListContainer.Provider>
    <NoPaddingWrapper>
      <div css={content}>
        <Entries<T> />
      </div>
    </NoPaddingWrapper>
  </ListContainer.Provider>
);

export default ManagedList;
