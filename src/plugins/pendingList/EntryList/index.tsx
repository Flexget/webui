import React, { FC } from 'react';
import { css } from '@emotion/core';
import theme from 'theme';
import { EntryContainer, useGetEntries } from '../hooks/entry';
import EntryCard from '../EntryCard';
import { Options } from '../types';

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

interface Props {
  options: Options;
  page: number;
}

const EntryList: FC<Props> = ({ options, page }) => {
  const [{ entries }] = EntryContainer.useContainer();
  useGetEntries(options, page);

  return (
    <div css={listWrapper}>
      {entries.map(entry => (
        <div key={entry.id} css={entryWrapper}>
          <EntryCard entry={entry} />
        </div>
      ))}
    </div>
  );
};

export default EntryList;
