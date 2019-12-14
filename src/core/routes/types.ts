import { ComponentType } from 'react';

export interface Route {
  component: ComponentType<any>;
  name: string;
  Icon: ComponentType;
  path?: string;
  children?: Route[];
}
