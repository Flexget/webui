import React, { createContext, useContext, ComponentType } from 'react';
import { RequestState, APIRequest, APIRequestCreator } from 'core/api';
import { ContainerProviderProps } from 'unstated-next';
import { OverflowMenuProps } from 'core/layout/AppBar/OverflowMenu';
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

interface EntryProps<T extends Entry> {
  entry: T;
}

export interface Card<T extends Entry> {
  ActionsLeft?: ComponentType<EntryProps<T>>;
  Actions?: ComponentType<EntryProps<T>>;
}

interface ListState<T extends Entry> {
  api: API;
  card: Card<T>;
  useMenuProps?: () => OverflowMenuProps[];
}

const PluginContext = createContext<unknown>(null);

export const usePluginContainer = <T extends Entry>() => {
  const value = useContext(PluginContext);
  if (value === null) {
    throw new Error('Component must be wrapped with <Container.Provider>');
  }
  return value as ListState<T>;
};

export function createPluginContainer<T extends Entry, State = void>(
  useHook: (initialState?: State) => ListState<T>,
) {
  function Provider({ initialState, children }: ContainerProviderProps<State>) {
    const value = useHook(initialState);
    return <PluginContext.Provider value={value}>{children}</PluginContext.Provider>;
  }

  return { Provider, useContainer: usePluginContainer };
}
