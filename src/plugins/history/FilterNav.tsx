import React, { FC, useEffect } from 'react';
import { Toolbar, Tooltip } from '@material-ui/core';
import { css } from '@emotion/core';
import SelectField from 'common/inputs/formik/SelectField';
import { Spacer } from 'common/styles';
import { useFormikContext } from 'formik';
import { useDebounce } from 'utils/hooks';
import DirectionButton from 'common/inputs/formik/DirectionButton';
import { TaskContainer } from 'core/tasks/hooks';
import { useContainer } from 'unstated-next';
import { GroupByFields, GetHistoryOptions, SortByFields } from './types';

const fieldWrapper = css`
  padding: 0.5rem 2rem 0.5rem;
`;

const textField = css`
  width: 7.5rem;
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
  const { values, submitForm } = useFormikContext<GetHistoryOptions>();

  const debouncedValues = useDebounce(values);
  const { tasks } = useContainer(TaskContainer);

  useEffect(() => {
    submitForm();
  }, [...Object.values(debouncedValues), submitForm]);

  return (
    <Toolbar>
      <div css={fieldWrapper}>
        <SelectField
          css={selectField}
          autoFocus
          id="task"
          label="Task Name"
          name="task"
          options={tasks.map(({ name }) => ({ value: name, label: name }))}
        />
      </div>
      <Spacer />
      <div css={fieldWrapper}>
        <SelectField id="sort" name="sort" label="Sort By" options={sortByFields} css={textField} />
      </div>
      <div>
        <SelectField
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
