import React, { ChangeEvent, FC } from 'react';
import { TablePagination } from '@material-ui/core';
import { EntryContainer } from 'plugins/pendingList/hooks/entry';
import { Options } from '../types';

interface Props {
  options: Options;
  page: number;
  setPage: SetState<number>;
  setPerPage: SetState<number>;
}

const Pagination: FC<Props> = ({ options, page, setPage, setPerPage }) => {
  const [{ totalCount }] = EntryContainer.useContainer();

  const handleChangePerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleChangePage = (_: unknown, p: number) => {
    setPage(p + 1);
  };

  return (
    <TablePagination
      rowsPerPageOptions={[30, 60, 90]}
      count={totalCount}
      rowsPerPage={options.perPage}
      page={page - 1}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangePerPage}
    />
  );
};

export default Pagination;
