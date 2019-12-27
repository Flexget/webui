import { useEffect, useState, useCallback } from 'react';
import { useFlexgetAPI } from 'core/api';
import { createContainer } from 'unstated-next';
import { AuthContainer } from 'core/auth/container';
import { useGlobalStatus, useGlobalInfo } from 'core/status/hooks';
import { Method } from 'utils/fetch';

interface VersionResponse {
  apiVersion: string;
  flexgetVersion: string;
  latestVersion: string;
}

export const VersionContainer = createContainer(() => {
  const [loggedIn] = AuthContainer.useContainer();
  const [version, setVersion] = useState<VersionResponse>();
  const [{ loading, error }, getVersion] = useFlexgetAPI<VersionResponse>('/server/version');
  useGlobalStatus(loading, error);

  useEffect(() => {
    const fn = async () => {
      if (!loggedIn) {
        const resp = await getVersion();
        if (resp.ok) {
          setVersion(resp.data);
        }
      }
    };
    fn();
  }, [getVersion, loggedIn]);

  return { loading, version };
});

export const enum ServerOperation {
  Reload = 'reload',
  Shutdown = 'shutdown',
}

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

export const enum DatabaseOperation {
  Cleanup = 'cleanup',
  Vacuum = 'vacuum',
  PluginReset = 'plugin_reset',
}

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
