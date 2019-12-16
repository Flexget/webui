import { useState, useEffect, useCallback } from 'react';
import { createContainer, useContainer } from 'unstated-next';
import { useFlexgetAPI } from 'core/api';
import { Method } from 'utils/fetch';
import { Operation } from './types';

export const AppBarContainer = createContainer(() => {
  const [title, setTitle] = useState('Flexget Manager');

  return [{ title }, { setTitle }] as const;
});

export const useInjectPageTitle = (title: string) => {
  const [, { setTitle }] = useContainer(AppBarContainer);

  useEffect(() => {
    setTitle(title);
    document.title = `Flexget Manager - ${title}`;
  }, [setTitle, title]);
};

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
