import React, { FC, ChangeEvent } from 'react';
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TablePagination,
} from '@material-ui/core';
import { useGetTaskStatus } from 'plugins/tasks/hooks';
import { useMergeState, useDebounce } from 'utils/hooks';
import { TaskStatusOptions, SortByStatus } from 'plugins/tasks/types';
import { Direction } from 'utils/query';

const headers = [{

}] 

export const TaskTable: FC = () => {
  const [options, setOptions] = useMergeState<TaskStatusOptions>({
    page: 0,
    perPage: 10,
    order: Direction.Desc,
    sortBy: SortByStatus.LastExecutionTime,
  });

  const handleChangePerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setOptions({
      perPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  const handleChangePage = (_: unknown, page: number) => {
    setOptions({
      page,
    });
  };

  const debouncedOptions = useDebounce(options);
  const { tasks, total } = useGetTaskStatus(debouncedOptions);

  return (
    <Paper>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Start Time</TableCell>
              <TableCell align="right">End Time</TableCell>
              <TableCell align="right">Produced</TableCell>
              <TableCell align="right">Accepted</TableCell>
              <TableCell align="right">Rejected</TableCell>
              <TableCell align="right">Failed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map(
              ({
                name,
                id,
                lastExecution: { start, end, produced, rejected, accepted, failed },
              }) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell align="right">{start}</TableCell>
                  <TableCell align="right">{end}</TableCell>
                  <TableCell align="right">{produced}</TableCell>
                  <TableCell align="right">{accepted}</TableCell>
                  <TableCell align="right">{rejected}</TableCell>
                  <TableCell align="right">{failed}</TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={debouncedOptions.perPage}
        page={debouncedOptions.page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangePerPage}
      />
    </Paper>
  );
};
