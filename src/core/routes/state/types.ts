import * as React from 'react';

export interface Route {
  component?: React.Component;
  name: string;
  Icon: string;
  path?: string;
  children?: Route[];
}
