import { useEffect, useState, useCallback } from 'react';
import { useFlexgetAPI } from 'core/api';
import { createContainer } from 'unstated-next';
import { AuthContainer } from 'core/auth/container';
import { useGlobalStatus } from 'core/status/hooks';
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

export const enum Operation {
  Reload = 'reload',
  Shutdown = 'shutdown',
}

export const useServerOperation = (operation: Operation, onSuccess = () => {}) => {
  const [state, request] = useFlexgetAPI('/server/manage', Method.Post);
  const makeRequest = useCallback(async () => {
    const resp = await request({ operation });
    if (resp.ok) {
      onSuccess();
    }
  }, [onSuccess, operation, request]);

  return [state, makeRequest] as const;
};
