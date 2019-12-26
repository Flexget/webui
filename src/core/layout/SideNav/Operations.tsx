import React, { FC, useMemo, useCallback, useState, ChangeEvent } from 'react';
import { Drawer, Divider, Button } from '@material-ui/core';
import { css } from '@emotion/core';
import SelectField from 'common/inputs/SelectField';
import { useFlexgetAPI } from 'core/api';
import { Method } from 'utils/fetch';
import { useGetPlugins } from './hooks';

interface Props {
  open?: boolean;
  onClose: () => void;
}

const innerDrawer = css`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

export const enum DatabaseOperation {
  Cleanup = 'cleanup',
  Vacuum = 'vacuum',
  PluginReset = 'plugin_reset',
}

const Operations: FC<Props> = ({ open = false, onClose }) => {
  const [{ loading }, performOperation] = useFlexgetAPI('/database', Method.Post);
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
        <Button color="primary" disabled={loading} onClick={cleanup}>
          Cleanup
        </Button>
        <Divider />
        <Button color="primary" disabled={loading} onClick={vacuum}>
          Vacuum
        </Button>
        <Divider />
        <SelectField
          options={options}
          value={pluginName}
          onChange={handleChange}
          placeholder="Select a Plugin"
          label="Plugin name"
        />
        <Button color="primary" disabled={loading || pluginsLoading} onClick={resetPLugin}>
          Reset Plugin
        </Button>
      </div>
    </Drawer>
  );
};

export default Operations;
