import { ComponentType } from 'react';
import { ReducersMapObject, Reducer } from 'redux';

export type ReducerHandler = (reducers?: ReducersMapObject) => void;
export type SagaHandler = (saga?: Function) => void;

export interface Plugin<S = any> {
  component?: ComponentType;
  children?: Plugin[];
  routeDisplayName: string;
  routeIcon: ComponentType;
  reducer?: Reducer<S>;
  saga?: Function;
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
