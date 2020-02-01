import { ComponentType } from 'react';

export interface Plugin {
  component: ComponentType;
  routeDisplayName: string;
  routeIcon: ComponentType;
  cardCompoennt?: ComponentType;
}

export type PluginMap = Record<string, Plugin>;
export type PluginUpdateHandler = (e: CustomEvent<PluginMap>) => void;
export type SubscribeHandler = (map: PluginMap) => void;

export interface Route {
  component: ComponentType;
  name: string;
  Icon: ComponentType;
  path: string;
}

export interface PluginEvent {
  plugin: Plugin;
  path: string;
}
