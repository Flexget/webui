import { useEffect, useState } from 'react';
import { useFlexgetAPI } from 'core/api';
import { createContainer } from 'unstated-next';
import { AuthContainer } from 'core/auth/hooks';
import { useGlobalStatus } from 'core/status/hooks';

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
