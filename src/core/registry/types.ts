import * as React from 'react';
import { ReducersMapObject, Reducer } from 'redux';

export type ReducerHandler = (reducers?: ReducersMapObject) => void;
export type SagaHandler = (saga?: Function) => void;

export interface Plugin {
  component?: React.Component;
  children?: Plugin[];
  routeDisplayName?: string;
  routeIcon?: string;
  reducer?: Reducer;
  saga?: Function;
}

export interface RouteConfig {
  path: string;
  component?: React.Component;
  children?: Plugin[];
  routeDisplayName: string;
  routeIcon: string;
}

export type RouteHandler = (route?: RouteConfig) => void;
