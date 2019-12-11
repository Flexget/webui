import { ComponentType } from 'react';

export interface Route {
  component?: ComponentType;
  name: string;
  Icon: ComponentType;
  path?: string;
  children?: Route[];
}
