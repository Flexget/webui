import { useEffect, useState, useCallback } from 'react';
import YAML from 'yaml';
import { useFlexgetAPI } from 'core/api';
import { Method } from 'utils/fetch';

export const useGetTaskConfig = (taskName: string) => {
  const [config, setConfig] = useState('');
  const [state, request] = useFlexgetAPI<Record<string, any>>(
    `/tasks/${encodeURIComponent(taskName)}`,
  );

  const fetch = useCallback(async () => {
    if (!taskName) return;
    const resp = await request();
    if (resp.ok) {
      setConfig(YAML.stringify(resp.data));
    }
  }, [request, taskName]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, config };
};

export const useCreateTask = () => {
  const [state, request] = useFlexgetAPI<Record<string, any>>('/tasks', Method.Post);
  const create = useCallback(
    (name: string, config: Record<string, any>) => request({ name, config }),
    [request],
  );
  return [state, create] as const;
};

export const useDeleteTask = (name: string) =>
  useFlexgetAPI(`/tasks/${encodeURIComponent(name)}`, Method.Delete);
