import React, { FC } from 'react';
import { Theme } from '@material-ui/core';
import { css } from '@emotion/core';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { NoPaddingWrapper } from 'common/styles';
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

interface Props {
  title: string;
}

const ManagedList: FC<Props> = ({ title }) => {
  useInjectPageTitle(title);

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

export default ManagedList;
