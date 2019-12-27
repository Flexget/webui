import React, { FC, ChangeEvent } from 'react';
import { FormControl, TablePagination, Theme } from '@material-ui/core';
import { css, ClassNames } from '@emotion/core';
import SelectField from 'common/inputs/SelectField';
import { Direction } from 'utils/query';
import { useContainer } from 'unstated-next';
import { Options, SortBy } from "./types";
import { EntryContainer } from './hooks/entry';

interface Props {
  setOptions: (opts: Partial<Options>) => void;
  options: Options;
}

const wrapper = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  padding-bottom: ${theme.typography.pxToRem(theme.spacing(2))};
  align-items: center;
`;

const container = css`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const item = (theme: Theme) => css`
  margin-left: ${theme.typography.pxToRem(theme.spacing(2))};
  margin-right: ${theme.typography.pxToRem(theme.spacing(2))};
`;

const input = css`
  font-size: inherit;
`;

const sortOrderOptions = [
  {
    value: Direction.Desc,
    label: 'Desc',
  },
  {
    value: Direction.Asc,
    label: 'Asc',
  },
];

const sortByOptions = [
  {
    value: SortBy.Added,
    label: 'Date Added',
  },
  {
    value: SortBy.Title,
    label: 'Title',
  },
  {
    value: SortBy.URL,
    label: 'URL',
  },
  {
    value: SortBy.Approved,
    label: 'Approved',
  },
];

const EntryListHeader: FC<Props> = ({ setOptions, options: { sortBy, page, perPage, order } }) => {
  const [{ totalCount }] = useContainer(EntryContainer);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOptions({
      [event.target.name]: event.target.value,
    } as Partial<Options>);
  };

  const handleChangePerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setOptions({ perPage: parseInt(event.target.value, 10) });
    setOptions({ page: 0 });
  };

  const handleChangePage = (_: unknown, p: number) => {
    setOptions({ page: p });
  };

  return (
    <>
      <ClassNames>
        {({ css: cssString }) => (
          <div css={wrapper}>
            <div css={container} />
            <div css={container}>
              <FormControl css={item}>
                <SelectField
                  label="Sort By"
                  value={sortBy}
                  onChange={handleChange}
                  name="sortBy"
                  id="sortBy"
                  size="small"
                  InputProps={{ className: cssString(input) }}
                  options={sortByOptions}
                />
              </FormControl>
              <FormControl css={item}>
                <SelectField
                  label="Order"
                  value={order}
                  onChange={handleChange}
                  name="order"
                  id="order"
                  size="small"
                  InputProps={{ className: cssString(input) }}
                  options={sortOrderOptions}
                />
              </FormControl>

              <TablePagination
                rowsPerPageOptions={[30, 60, 90]}
                count={totalCount}
                rowsPerPage={perPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangePerPage}
                component="div"
              />
            </div>
          </div>
        )}
      </ClassNames>
    </>
  );
};

export default EntryListHeader;
