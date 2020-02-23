import { useEffect, useState, useCallback } from 'react';
import { useFlexgetAPI } from 'core/api';
import { useGlobalInfo } from 'core/status/hooks';
import { Method } from 'utils/fetch';
import { ServerOperation, DatabaseOperation } from 'core/operations/types';

export const useServerOperation = (operation: ServerOperation, onSuccess = () => {}) => {
  const [state, request] = useFlexgetAPI('/server/manage', Method.Post);
  const makeRequest = useCallback(async () => {
    const resp = await request({ operation });
    if (resp.ok) {
      onSuccess();
    }
  }, [onSuccess, operation, request]);
  return [state, makeRequest] as const;
};

export const useGetPlugins = () => {
  const [plugins, setPlugins] = useState<string[]>([]);
  const [{ loading }, getPlugins] = useFlexgetAPI<string[]>('/database/plugins');
  useEffect(() => {
    const fn = async () => {
      const resp = await getPlugins();
      if (resp.ok) {
        setPlugins(resp.data);
      }
    };
    fn();
  }, [getPlugins]);
  return { loading, plugins };
};

interface DBRequest {
  operation: DatabaseOperation;
  pluginName?: string;
}

interface DBResponse {
  message: string;
}

export const useDBOperation = () => {
  const [state, request] = useFlexgetAPI<DBResponse>('/database', Method.Post);
  const pushInfo = useGlobalInfo();
  const performOperation = useCallback(
    async (req: DBRequest) => {
      const resp = await request(req);
      if (resp.ok) {
        pushInfo(resp.data.message);
      }
    },
    [pushInfo, request],
  );
  return [state, performOperation] as const;
};
