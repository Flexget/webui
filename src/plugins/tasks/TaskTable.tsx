import React, { ChangeEvent, useCallback, Key } from 'react';
import { useFormikContext } from 'formik';
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TablePagination,
  TableSortLabel,
  TableRowProps,
  TableFooter,
} from '@material-ui/core';
import { useDebounceFormikSubmit } from 'utils/hooks';
import { Direction, DefaultOptions, toggleDirection } from 'utils/query';

interface Row<T> {
  key: Key;
  data: T;
  props?: TableRowProps;
}

export interface Header<T extends Key> {
  id: T;
  label?: string;
  sortByField?: boolean;
  numeric?: boolean;
}

interface Props<T> {
  rows: Row<T>[];
  headers: Header<Extract<keyof T, Key>>[];
  total: number;
}

const TaskTable = <T extends {}>({ total, headers, rows }: Props<T>) => {
  const {
    setFieldValue,
    values: { order, perPage, page, sortBy },
  } = useFormikContext<DefaultOptions>();

  const handleChangePerPage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFieldValue('perPage', parseInt(event.target.value, 10));
      setFieldValue('page', 0);
    },
    [setFieldValue],
  );

  const handleChangePage = useCallback(
    (_: unknown, p: number) => {
      setFieldValue('page', p);
    },
    [setFieldValue],
  );

  const handleSortClick = useCallback(
    (field: keyof T) => {
      if (sortBy === field) {
        setFieldValue('order', toggleDirection(order));
      } else {
        setFieldValue('sortBy', field);
        setFieldValue('order', Direction.Asc);
      }
    },
    [order, setFieldValue, sortBy],
  );

  useDebounceFormikSubmit(500);

  return (
    <Paper>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {headers.map(({ id, label, sortByField, numeric }) => (
                <TableCell
                  key={id}
                  align={numeric ? 'right' : 'left'}
                  sortDirection={id === sortBy ? order : false}
                >
                  {sortByField ? (
                    <TableSortLabel
                      active={id === sortBy}
                      direction={id === sortBy ? order : Direction.Asc}
                      onClick={() => handleSortClick(id)}
                    >
                      {label}
                    </TableSortLabel>
                  ) : (
                    label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ key, data, props = {} }) => (
              <TableRow key={key} {...props}>
                {headers.map(({ id, numeric }) => (
                  <TableCell key={id} align={numeric ? 'right' : 'left'}>
                    {data[id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        size="medium"
        rowsPerPageOptions={[5, 10, 25]}
        count={total}
        rowsPerPage={perPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangePerPage}
      />
    </Paper>
  );
};

export default TaskTable;
