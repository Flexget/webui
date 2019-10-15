import { PluginRegistry } from 'core/registry';

declare global {
  interface Window {
    registerFlexgetPlugin: PluginRegistry['registerPlugin'];
  }

  type Optional<T> = T | undefined;
  type ArgType<T> = T extends (...args: infer R) => any ? R : any;
}

export {};
