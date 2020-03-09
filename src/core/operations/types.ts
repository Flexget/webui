import { ComponentType } from 'react';

export interface OperationDisplay {
  Icon: ComponentType;
  name: string;
}

export const enum ServerOperation {
  Reload = 'reload',
  Shutdown = 'shutdown',
}

export const enum DatabaseOperation {
  Cleanup = 'cleanup',
  Vacuum = 'vacuum',
  PluginReset = 'plugin_reset',
}
