import { useEffect, useState } from 'react';
import { useFlexgetAPI } from 'core/api';

interface VersionResponse {
  apiVersion: string;
  flexgetVersion: string;
  latestVersion: string;
}

export const useVersion = () => {
  const [version, setVersion] = useState<VersionResponse>();
  const [{ loading }, getVersion] = useFlexgetAPI<VersionResponse>('/server/version');

  useEffect(() => {
    const fn = async () => {
      const resp = await getVersion();
      if (resp.ok) {
        setVersion(resp.data);
      }
    };
    fn();
  }, [getVersion]);

  return { loading, version };
};
