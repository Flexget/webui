import { useEffect, useState } from 'react';
import { useFlexgetAPI } from 'core/api';
import { createContainer, useContainer } from 'unstated-next';
import { AuthContainer } from 'core/auth/hooks';

interface VersionResponse {
  apiVersion: string;
  flexgetVersion: string;
  latestVersion: string;
}

export const VersionContainer = createContainer(() => {
  const [loggedIn] = useContainer(AuthContainer);
  const [version, setVersion] = useState<VersionResponse>();
  const [{ loading }, getVersion] = useFlexgetAPI<VersionResponse>('/server/version');

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
