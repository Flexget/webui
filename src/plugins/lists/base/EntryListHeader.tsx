import React, { FC, ChangeEvent, useEffect } from 'react';
import { FormControl, TablePagination, Theme } from '@material-ui/core';
import { css, ClassNames } from '@emotion/core';
import SelectField from 'common/inputs/formik/SelectField';
import { Direction } from 'utils/query';
import { useContainer } from 'unstated-next';
import { useFormikContext } from 'formik';
import { useDebounce } from 'utils/hooks';
import { Options } from './types';
import { EntryContainer } from './hooks/entry';
import { usePluginContainer } from './hooks/api';

interface Props {
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

const EntryListHeader: FC<Props> = ({ options: { page, perPage } }) => {
  const [{ totalCount }] = useContainer(EntryContainer);

  const { sortByOptions } = usePluginContainer();

  const { values, submitForm, setFieldValue } = useFormikContext<Options>();

  const handleChangePerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue('perPage', parseInt(event.target.value, 10));
    setFieldValue('page', 0);
  };

  const handleChangePage = (_: unknown, p: number) => {
    setFieldValue('page', p);
  };

  const debouncedValues = useDebounce(values);

  useEffect(() => {
    submitForm();
  }, [...Object.values(debouncedValues), submitForm]); // eslint-disable-line react-hooks/exhaustive-deps

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
