import { PluginRegistry } from 'core/registry';

declare global {
  interface Window {
    registerFlexgetPlugin: PluginRegistry['registerPlugin'];
  }
}

export {};
