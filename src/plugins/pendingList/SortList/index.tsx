import React, { FC, ChangeEvent } from 'react';
import { Options, SortBy } from 'plugins/pendingList/types';
import { Select, FormControl, MenuItem } from '@material-ui/core';
import { css } from '@emotion/core';

interface Props extends Options {
  onSortUpdate: (opts: Partial<Options>) => void;
}

type Targets = {
  [P in keyof Options]: {
    name: P;
    value: Options[P];
  };
}[keyof Options];

export const wrapper = css`
  display: flex;
  justify-content: center;
  > div {
    margin-left: 2em;
    margin-right: 2em;
  }
`;
const SortList: FC<Props> = ({ onSortUpdate, sortBy, sortOrder, perPage }) => {
  const handleChange = (event: ChangeEvent<Targets>) => {
    onSortUpdate({
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div css={wrapper}>
      <FormControl>
        <Select
          value={sortBy}
          onChange={handleChange}
          inputProps={{
            name: 'sortBy',
            id: 'sortBy',
          }}
        >
          <MenuItem value={SortBy.Added}>Date Added</MenuItem>
          <MenuItem value={SortBy.Title}>Title</MenuItem>
          <MenuItem value={SortBy.URL}>URL</MenuItem>
          <MenuItem value={SortBy.Approved}>Approved</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <Select
          value={sortOrder}
          onChange={handleChange}
          inputProps={{
            name: 'sortOrder',
            id: 'sortOrder',
          }}
        >
          <MenuItem value="desc">Desc</MenuItem>
          <MenuItem value="asc">Asc</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <Select
          value={perPage}
          onChange={handleChange}
          inputProps={{
            name: 'perPage',
            id: 'perPage',
          }}
        >
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SortList;
