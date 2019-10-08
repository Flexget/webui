import * as React from 'react';

export interface Route {
  component?: React.Component;
  name: string;
  icon: string;
  path?: string;
  children?: Route[];
}
