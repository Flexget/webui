import React, { FC } from 'react';
import { css } from '@emotion/core';
import theme from 'theme';
import { EntryContainter } from 'plugins/pendingList/hooks/entry';
import Entry from '../Entry';

export const listWrapper = css`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const entryWrapper = css`
  width: 100%;
  padding: ${theme.typography.pxToRem(theme.spacing(2))};

  ${theme.breakpoints.up('sm')} {
    width: 100%;
  }

  ${theme.breakpoints.up('md')} {
    width: 50%;
  }
`;

const EntryList: FC = () => {
  const [{ entries }] = EntryContainter.useContainer();
  return (
    <div css={listWrapper}>
      {entries.map(entry => (
        <div key={entry.id} css={entryWrapper}>
          <Entry entry={entry} />
        </div>
      ))}
    </div>
  );
};

export default EntryList;
