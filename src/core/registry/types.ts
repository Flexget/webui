import { ComponentType } from 'react';
import { ReducersMapObject, Reducer } from 'redux';

export type ReducerHandler = (reducers?: ReducersMapObject) => void;
export type SagaHandler = (saga?: Function) => void;

export interface Plugin<S = any> {
  component?: ComponentType;
  children?: Plugin[];
  routeDisplayName: string;
  routeIcon: string;
  reducer?: Reducer<S>;
  saga?: Function;
  name?: string;
}

export interface RouteConfig {
  path: string;
  component?: ComponentType;
  children?: Plugin[];
  routeDisplayName: string;
  routeIcon: string;
}

export type RouteHandler = (route?: RouteConfig) => void;
