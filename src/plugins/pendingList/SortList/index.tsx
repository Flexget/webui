import React, { FC, ChangeEvent } from 'react';
import { Options, SortBy } from 'plugins/pendingList/types';
import { FormControl, TablePagination } from '@material-ui/core';
import { css, ClassNames } from '@emotion/core';
import theme from 'theme';
import SelectField from 'common/SelectField';
import { Direction } from 'utils/query';
import { EntryContainer } from 'plugins/pendingList/hooks/entry';

interface Props {
  dispatch: (opts: Partial<Options>) => void;
  options: Options;
}

const wrapper = css`
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

const item = css`
  margin-left: ${theme.typography.pxToRem(theme.spacing(2))};
  margin-right: ${theme.typography.pxToRem(theme.spacing(2))};
`;

const input = css`
  font-size: inherit;
`;
const SortList: FC<Props> = ({ dispatch, options: { sortBy, page, perPage, sortOrder } }) => {
  const [{ totalCount }] = EntryContainer.useContainer();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      [event.target.name]: event.target.value,
    } as Partial<Options>);
  };

  const handleChangePerPage = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ perPage: parseInt(event.target.value, 10) });
    dispatch({ page: 0 });
  };

  const handleChangePage = (_: unknown, p: number) => {
    dispatch({ page: p });
  };

  return (
    <ClassNames>
      {({ css: cssString }) => (
        <div css={wrapper}>
          <div css={container}>
            <FormControl css={item}>
              <SelectField
                value={sortBy}
                onChange={handleChange}
                name="sortBy"
                id="sortBy"
                size="small"
                InputProps={{ className: cssString(input) }}
                options={[
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
                ]}
              />
            </FormControl>
            <FormControl css={item}>
              <SelectField
                value={sortOrder}
                onChange={handleChange}
                name="sortOrder"
                id="sortOrder"
                size="small"
                InputProps={{ className: cssString(input) }}
                options={[
                  {
                    value: Direction.Desc,
                    label: 'Desc',
                  },
                  {
                    value: Direction.Asc,
                    label: 'Asc',
                  },
                ]}
              />
            </FormControl>
          </div>

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
      )}
    </ClassNames>
  );
};

export default SortList;
