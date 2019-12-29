import React, { createContext, useContext, ComponentType } from 'react';
import { RequestState, APIRequest } from 'core/api';
import { ContainerProviderProps } from 'unstated-next';
import { OverflowMenuProps } from 'core/layout/AppBar/OverflowMenu';
import { Option } from 'common/inputs/SelectField';
import { List, Entry } from '../types';

interface ListAPI {
  useGet: () => [RequestState, APIRequest<List[]>];
  useAdd: () => [RequestState, APIRequest<List>];
  useRemove: (listId?: number) => [RequestState, APIRequest];
}

interface EntryAPI {
  useGet: (listId: number | undefined, query: string) => [RequestState, APIRequest<Entry[]>];
  useAdd: (listId?: number) => [RequestState, APIRequest<Entry>];
  useRemove: (listId?: number, entryId?: number) => [RequestState, APIRequest];
  useRemoveBulk: (listId?: number) => [RequestState, APIRequest];
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
  card?: Card<T>;
  useMenuProps?: () => OverflowMenuProps[];
  sortByOptions: Option[];
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
