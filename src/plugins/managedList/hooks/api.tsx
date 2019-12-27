import React, { createContext, useContext } from 'react';
import { RequestState, APIRequest, APIRequestCreator } from 'core/api';
import { ContainerProviderProps } from 'unstated-next';
import { List, Entry } from '../types';

type SelectedId = number | undefined;
interface ListAPI {
  get: [RequestState, APIRequest<List[]>];
  add: [RequestState, APIRequest<List>];
  remove: [RequestState, APIRequestCreator<[SelectedId]>];
}

interface EntryAPI {
  get: [RequestState, APIRequestCreator<[SelectedId, string], Entry[]>];
  add: [RequestState, APIRequestCreator<[SelectedId], Entry>];
  update: [RequestState, APIRequestCreator<[SelectedId, number], Entry>];
  remove: [RequestState, APIRequestCreator<[SelectedId, SelectedId]>];
  removeBulk: [RequestState, APIRequestCreator<[SelectedId]>];
  updateBulk: [RequestState, APIRequestCreator<[SelectedId], Entry[]>];
}

export interface API {
  list: ListAPI;
  entry: EntryAPI;
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
