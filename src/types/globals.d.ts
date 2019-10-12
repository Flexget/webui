import { PluginRegistry } from 'core/registry';

declare global {
  interface Window {
    registerFlexgetPlugin: PluginRegistry['registerPlugin'];
  }

  type Optional<T> = T | undefined;
}

export {};
