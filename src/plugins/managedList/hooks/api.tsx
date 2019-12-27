import React, { createContext, useContext } from 'react';
import { RequestState, APIRequest, APIRequestCreator } from 'core/api';
import { ContainerProviderProps } from 'unstated-next';
import { List } from '../types';

interface ListAPI {
  get: [RequestState, APIRequest<List[]>];
  add: [RequestState, APIRequest<List>];
  remove: [RequestState, APIRequestCreator<[number | undefined]>];
}

export interface API {
  list: ListAPI;
}

const PluginContext = createContext<API | null>(null);

export const usePluginContainer = () => {
  const value = useContext(PluginContext);
  if (value === null) {
    throw new Error('Component must be wrapped with <Container.Provider>');
  }
  return value;
};

export function createPluginContainer<State = void>(useHook: (initialState?: State) => API) {
  function Provider({ initialState, children }: ContainerProviderProps<State>) {
    const value = useHook(initialState);
    return <PluginContext.Provider value={value}>{children}</PluginContext.Provider>;
  }

  return { Provider, useContainer: usePluginContainer };
}
