import React, { FC, ChangeEvent } from 'react';
import { FormControl, TablePagination, Button } from '@material-ui/core';
import { css, ClassNames } from '@emotion/core';
import theme from 'theme';
import SelectField from 'common/SelectField';
import { Direction } from 'utils/query';
import { useOverlayState } from 'utils/hooks/useOverlayState';
import RemoveListDialog from 'plugins/pendingList/RemoveListDialog';
import { Options, SortBy } from '../types';
import { EntryContainer } from '../hooks/entry';
import AddEntryDialog from '../AddEntryDialog';

interface Props {
  setOptions: (opts: Partial<Options>) => void;
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
  const [{ totalCount }] = EntryContainer.useContainer();
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

  const [addIsOpen, { open: addOpen, close: addClose }] = useOverlayState(false);
  const [removeIsOpen, { open: removeOpen, close: removeClose }] = useOverlayState(false);

  return (
    <>
      <ClassNames>
        {({ css: cssString }) => (
          <div css={wrapper}>
            <div css={container}>
              <Button color="secondary" onClick={addOpen} css={item}>
                Add New Entry
              </Button>
              <Button color="secondary" onClick={removeOpen} css={item}>
                Remove List
              </Button>
            </div>
            <div css={container}>
              <FormControl css={item}>
                <SelectField
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
      <AddEntryDialog open={addIsOpen} onClose={addClose} />
      <RemoveListDialog open={removeIsOpen} onClose={removeClose} />
    </>
  );
};

export default EntryListHeader;
