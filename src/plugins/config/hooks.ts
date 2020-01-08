import { useEffect, useState, useCallback } from 'react';
import YAML from 'yaml';
import { useFlexgetAPI } from 'core/api';
import { Method } from 'utils/fetch';

interface RawConfigResp {
  rawConfig: string;
}

export const useGetConfig = () => {
  const [get, getRequest] = useFlexgetAPI<RawConfigResp>('/server/raw_config');
  const [post, postRequest] = useFlexgetAPI<RawConfigResp>('/server/raw_config', Method.Post);
  const [config, setConfig] = useState('');

  useEffect(() => {
    const fn = async () => {
      const resp = await getRequest();
      if (resp.ok) {
        setConfig(atob(resp.data.rawConfig));
      }
    };

    fn();
  }, [getRequest]);

  const saveConfig = useCallback(
    async (v: string) => {
      const resp = await postRequest({ rawConfig: btoa(v) });
      if (resp.ok) {
        setConfig(v);
      }
      return resp;
    },
    [postRequest],
  );

  return [{ config, state: { get, post } }, saveConfig] as const;
};

export const useGetVariables = () => {
  const [get, getRequest] = useFlexgetAPI<RawConfigResp>('/variables');
  const [post, postRequest] = useFlexgetAPI('/variables', Method.Put);
  const [variables, setVariables] = useState('');

  useEffect(() => {
    const fn = async () => {
      const resp = await getRequest();
      if (resp.ok) {
        setVariables(YAML.stringify(resp.data));
      }
    };

    fn();
  }, [getRequest]);

  const saveVariables = useCallback(
    async (v: string) => {
      const resp = await postRequest(YAML.parse(v));
      if (resp.ok) {
        setVariables(v);
      }
      return resp;
    },
    [postRequest],
  );

  return [{ variables, state: { get, post } }, saveVariables] as const;
};
