import { useFlexgetAPI } from 'core/api';
import { useEffect, useState } from 'react';

interface RawConfigResp {
  rawConfig: string;
}

export const useGetConfig = () => {
  const [state, request] = useFlexgetAPI<RawConfigResp>('/server/raw_config');
  const [config, setConfig] = useState('');

  useEffect(() => {
    const fn = async () => {
      const resp = await request();
      if (resp.ok) {
        setConfig(atob(resp.data.rawConfig));
      }
    };

    fn();
  }, [request]);

  return [{ config, ...state }, setConfig] as const;
};
