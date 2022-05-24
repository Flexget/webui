import { registerPlugin, subscribe } from 'core/plugins/registry';
import { SetStateAction, Dispatch } from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-extended';

declare global {
  const __VERSION__: string;

  interface Window {
    registerFlexgetPlugin: typeof registerPlugin;
    subscribeFlexgetPlugins: typeof subscribe;
    MonacoEnvironment: Record<string, any>;
    __VERSION__: string;
  }

  type SetState<T> = Dispatch<SetStateAction<T>>;

  type OptionalProps<T, K extends keyof T> = Omit<T, K> &
    {
      [P in K]?: T[P];
    };

  type PropReturnType<T extends Record<string, Function>> = ReturnType<T[keyof T]>;
}

export {};
