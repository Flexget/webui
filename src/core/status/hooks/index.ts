import { createContainer } from 'unstated-next';
import { useState } from 'react';

interface State {
  loading?: boolean;
  info?: string;
  error?: string;
}

const useGlobalStatus = ({ loading = false, info, error }: State = {}) => {
  const [loadingState, setLoading] = useState(loading);
  const [infoState, setInfo] = useState(info);
  const [errorState, setError] = useState(error);

  return [
    {
      loading: loadingState,
      info: infoState,
      error: errorState,
    },
    {
      setLoading,
      setInfo,
      setError,
    },
  ] as const;
};

export const StatusContainer = createContainer(useGlobalStatus);
