import React, { FC, ChangeEvent } from 'react';
import { TablePagination, Theme } from '@material-ui/core';
import { css, ClassNames } from '@emotion/core';
import SelectField from 'common/inputs/formik/SelectField';
import { useContainer } from 'unstated-next';
import { useFormikContext } from 'formik';
import { useDebounceFormikSubmit } from 'utils/hooks';
import { Direction } from 'utils/query';
import { GetShowOptions, SortByShow, ConfigState } from '../types';
import { ShowContainer } from '../hooks/shows';

interface Props {
  options: GetShowOptions;
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

const sortByOptions = [
  {
    value: SortByShow.ShowName,
    label: 'Show Name',
  },
  {
    value: SortByShow.LastDownloadDate,
    label: 'Last Download Date',
  },
];

const orderByOptions = [
  {
    value: Direction.Desc,
    label: 'Desc',
  },
  {
    value: Direction.Asc,
    label: 'Asc',
  },
];

const configOptions = [
  {
    value: ConfigState.Configured,
    label: 'Configured',
  },
  {
    value: ConfigState.Unconfigured,
    label: 'Unconfigured',
  },
  {
    value: ConfigState.All,
    label: 'All Shows',
  },
];

const Header: FC<Props> = ({ options: { page, perPage } }) => {
  const [{ totalCount }] = useContainer(ShowContainer);

  const { setFieldValue } = useFormikContext<GetShowOptions>();

  const handleChangePerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue('perPage', parseInt(event.target.value, 10));
    setFieldValue('page', 0);
  };

  const handleChangePage = (_: unknown, p: number) => {
    setFieldValue('page', p);
  };

  useDebounceFormikSubmit();

  return (
    <>
      <ClassNames>
        {({ css: cssString }) => (
          <div css={wrapper}>
            <div css={container} />
            <div css={container}>
              <SelectField
                label="Configured"
                name="inConfig"
                id="inConfig"
                size="small"
                InputProps={{ className: cssString(input) }}
                options={configOptions}
              />
              <SelectField
                css={item}
                label="Sort By"
                name="sortBy"
                id="sortBy"
                size="small"
                InputProps={{ className: cssString(input) }}
                options={sortByOptions}
              />
              <SelectField
                css={item}
                label="Order"
                name="order"
                id="order"
                size="small"
                InputProps={{ className: cssString(input) }}
                options={orderByOptions}
              />

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

export default Header;
