import { FC } from 'react';
import { Toolbar, Tooltip, Theme } from '@mui/material';
import { css } from '@emotion/react';
import SelectField from 'common/inputs/formik/SelectField';
import { Spacer } from 'common/styles';
import { useDebounceFormikSubmit } from 'utils/hooks';
import DirectionButton from 'common/inputs/formik/DirectionButton';
import { TaskContainer } from 'plugins/tasks/hooks';
import { useContainer } from 'unstated-next';
import { GroupByFields, SortByFields } from './types';

// Toolbar owns the top/bottom padding for the whole row (matching the
// theme.spacing(2) convention every other NoPaddingWrapper page re-applies)
// so individual fields don't each need their own vertical padding.
const toolbar = (theme: Theme) => css`
  padding-top: ${theme.typography.pxToRem(parseFloat(theme.spacing(2)))};
  padding-bottom: ${theme.typography.pxToRem(parseFloat(theme.spacing(2)))};
`;

const fieldWrapper = css`
  padding: 0 2rem;
`;

const textField = css`
  min-width: 11rem;
`;

const selectField = css`
  min-width: 20rem;
`;
const groupByFields = [
  {
    value: GroupByFields.Task,
    label: 'Task',
  },
  {
    value: GroupByFields.Time,
    label: 'Time',
  },
];

const sortByFields = [
  {
    value: SortByFields.Details,
    label: 'Details',
  },
  {
    value: SortByFields.Filename,
    label: 'Filename',
  },
  {
    value: SortByFields.Id,
    label: 'ID',
  },
  {
    value: SortByFields.Task,
    label: 'Task',
  },
  {
    value: SortByFields.Time,
    label: 'Time',
  },
  {
    value: SortByFields.Title,
    label: 'Title',
  },
  {
    value: SortByFields.Url,
    label: 'URL',
  },
];

const FilterNav: FC = () => {
  const { tasks } = useContainer(TaskContainer);

  useDebounceFormikSubmit();

  return (
    <Toolbar css={toolbar}>
      <div css={fieldWrapper}>
        <SelectField
          css={selectField}
          size="small"
          autoFocus
          id="task"
          label="Task Name"
          name="task"
          options={tasks.map(({ name }) => ({ value: name, label: name }))}
        />
      </div>
      <Spacer />
      <div css={fieldWrapper}>
        <SelectField
          size="small"
          id="sort"
          name="sort"
          label="Sort By"
          options={sortByFields}
          css={textField}
        />
      </div>
      <div css={fieldWrapper}>
        <SelectField
          size="small"
          id="grouping"
          label="Group By"
          name="grouping"
          options={groupByFields}
          css={textField}
        />
      </div>
      <Tooltip title="Toggle Direction">
        <DirectionButton color="inherit" name="order" id="order" aria-label="Toggle Direction" />
      </Tooltip>
    </Toolbar>
  );
};

export default FilterNav;
