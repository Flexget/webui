import { ComponentType } from 'react';

export interface Plugin {
  component?: ComponentType;
  children?: Plugin[];
  routeDisplayName: string;
  routeIcon: ComponentType;
  name?: string;
}

export interface RouteConfig {
  path: string;
  component?: ComponentType;
  children?: Plugin[];
  routeDisplayName: string;
  routeIcon: ComponentType;
}

export type RouteHandler = (route: Record<string, Route>) => void;

export interface Route {
  component: ComponentType<any>;
  name: string;
  Icon: ComponentType;
  path?: string;
  children?: Route[];
}
