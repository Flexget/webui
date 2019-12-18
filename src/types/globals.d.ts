import { PluginRegistry } from 'core/routes/registry';
import { SetStateAction, Dispatch } from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-extended';
import 'jest-chain';

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
