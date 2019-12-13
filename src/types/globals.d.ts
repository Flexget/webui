import { PluginRegistry } from 'core/registry';
import { SetStateAction, Dispatch } from 'react';
import 'jest-extended';

declare global {
  interface Window {
    registerFlexgetPlugin: PluginRegistry['registerPlugin'];
  }

  type SetState<T> = Dispatch<SetStateAction<T>>;

  type OptionalProps<T, K extends keyof T> = Omit<T, K> &
    {
      [P in K]?: T[P];
    };

  type PropReturnType<T extends Record<string, Function>> = ReturnType<T[keyof T]>;
}

export {};
