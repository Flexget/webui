import { FC, useCallback } from 'react';
import { css } from '@emotion/react';
import { Fab, Theme } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { Direction } from 'utils/query';
import { useMergeState, useOverlayState } from 'utils/hooks';
import { Formik } from 'formik';
import { ShowContainer } from '../hooks/shows';
import ShowList from './ShowList';
import { GetShowOptions, SortByShow, ConfigState } from '../types';
import Header from './Header';
import AddShowDialog from './AddShowDialog';

const speedDialCss = (theme: Theme) => css`
  position: absolute;
  bottom: ${theme.typography.pxToRem(parseFloat(theme.spacing(2)))};
  right: ${theme.typography.pxToRem(parseFloat(theme.spacing(2)))};
`;

const ShowPage: FC = () => {
  useInjectPageTitle('Series');

  const [options, setOptions] = useMergeState<GetShowOptions>({
    page: 0,
    perPage: 30,
    order: Direction.Desc,
    sortBy: SortByShow.ShowName,
    inConfig: ConfigState.Configured,
  });

  const handleSubmit = useCallback(values => setOptions(values), [setOptions]);

  const [isOpen, { close, open }] = useOverlayState();

  return (
    <ShowContainer.Provider>
      <Formik initialValues={options} onSubmit={handleSubmit}>
        <Header options={options} />
      </Formik>
      <ShowList options={options} />
      <Fab aria-label="Add" onClick={open} css={speedDialCss} color="primary">
        <Add />
      </Fab>
      <AddShowDialog open={isOpen} onClose={close} />
    </ShowContainer.Provider>
  );
};

export default ShowPage;
