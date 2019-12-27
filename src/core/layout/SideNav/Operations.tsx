import React, { FC, useMemo, useCallback, useState, ChangeEvent } from 'react';
import { Drawer, Divider, Button, Theme, Typography } from '@material-ui/core';
import { css } from '@emotion/core';
import SelectField from 'common/inputs/SelectField';
import { useGetPlugins, DatabaseOperation, useDBOperation } from './hooks';

interface Props {
  open?: boolean;
  onClose: () => void;
}

const innerDrawer = css`
  width: 300px;
`;

const drawerSection = (theme: Theme) => css`
  padding: ${theme.typography.pxToRem(theme.spacing(3))};
  display: flex;
  flex-direction: column;
`;

const button = (theme: Theme) => css`
  margin-top: ${theme.typography.pxToRem(theme.spacing(2))};
`;

const header = (theme: Theme) => css`
  background-color: ${theme.palette.primary.main};
  color: ${theme.palette.getContrastText(theme.palette.primary.main)};
  padding: ${theme.typography.pxToRem(theme.spacing(3))};
`;

const Operations: FC<Props> = ({ open = false, onClose }) => {
  const [{ loading }, performOperation] = useDBOperation();
  const { loading: pluginsLoading, plugins } = useGetPlugins();
  const [pluginName, setPluginName] = useState('');

  const options = useMemo(() => plugins.map(plugin => ({ label: plugin, value: plugin })), [
    plugins,
  ]);

  const vacuum = useCallback(() => performOperation({ operation: DatabaseOperation.Vacuum }), [
    performOperation,
  ]);

  const cleanup = useCallback(() => performOperation({ operation: DatabaseOperation.Cleanup }), [
    performOperation,
  ]);

  const resetPLugin = useCallback(
    () => performOperation({ operation: DatabaseOperation.PluginReset, pluginName }),
    [performOperation, pluginName],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setPluginName(event.target.value),
    [],
  );

  return (
    <Drawer open={open} variant="temporary" onClose={onClose} anchor="right">
      <div css={innerDrawer}>
        <div css={header}>
          <Typography variant="h5">DB Operations</Typography>
        </div>
        <div css={drawerSection}>
          <Typography variant="body2">Removes all old/unneeded data from the database</Typography>
          <Button css={button} color="primary" disabled={loading} onClick={cleanup}>
            Cleanup
          </Button>
        </div>
        <Divider />
        <div css={drawerSection}>
          <Typography variant="body2">
            Vacuuming potentially increases performance and decreases database size by removing dead
            rows.
          </Typography>
          <Button css={button} color="primary" disabled={loading} onClick={vacuum}>
            Vacuum
          </Button>
        </div>
        <Divider />
        <div css={drawerSection}>
          <Typography variant="body2">Resets the database of a specific plugin</Typography>
          <SelectField
            options={options}
            value={pluginName}
            onChange={handleChange}
            id="pluginName"
            name="pluginName"
            label="Plugin name"
          />
          <Button
            css={button}
            color="primary"
            disabled={loading || pluginsLoading}
            onClick={resetPLugin}
          >
            Reset Plugin
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default Operations;
