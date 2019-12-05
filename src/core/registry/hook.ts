import { Component, useReducer } from 'react';
import { createContainer } from 'unstated-next';
import { Action } from 'utils/hooks/actions';

interface PluginInfo {
  prefix: string;
  name: string;
  icon: string;
}

export interface PluginItem {
  info: PluginInfo;
  component: Component;
}

export interface PluginGroup {
  info: PluginInfo;
  plugins: Plugin;
}

type Plugin = PluginItem | PluginGroup;

type PluginMap = Record<string, Plugin>;

const enum Constants {
  REGISTER = '@flexget/registry/REGISTER',
  UNREGISTER = '@flexget/registry/UNREGISTER',
}

type RegisterAction = Action<Constants.REGISTER, Plugin>;
type UnregisterAction = Action<Constants.UNREGISTER, { prefix: string }>;

type Actions = RegisterAction | UnregisterAction;

const registryReducer = (state: PluginMap, action: Actions): PluginMap => {
  switch (action.type) {
    case Constants.REGISTER:
      return {
        ...state,
        [action.payload.info.prefix]: action.payload,
      };

    default:
      return state;
  }
};

export const useRegistry = (initialState: PluginMap) => {
  const [pluginMap] = useReducer(registryReducer, initialState);

  return [pluginMap];
};

const Container = createContainer(useRegistry);

export default Container;
