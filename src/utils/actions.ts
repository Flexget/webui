import actions, { Constants } from 'core/status/state/actions';
import { requesting } from 'core/status/state/util';
import is from './is';

interface Meta<T extends string = string> {
  readonly message?: string;
  readonly type?: T;
  readonly statusCode?: string;
}

export interface Action<T extends string, P = undefined, U extends string = string> {
  readonly type: T;
  readonly meta: Meta<U>;
  readonly payload: P;
}

type ActionCreator = (...args: any[]) => any;
interface AsyncActionCreator {
  request: ActionCreator;
  success: ActionCreator;
  failure: ActionCreator;
}

interface ActionCreatorsDictionary {
  [action: string]: ActionCreator | AsyncActionCreator;
}

export type ActionsUnion<T extends ActionCreatorsDictionary> = ReturnType<
  {
    [K in keyof T]: T[K] extends AsyncActionCreator
      ? T[K][keyof AsyncActionCreator]
      : T[K] extends ActionCreator
      ? T[K]
      : never;
  }[keyof T]
>;
export type ActionsOfType<T, U extends string, M extends string = string> = T extends Action<
  U,
  any,
  M
>
  ? T
  : never;

export type RequestsOfType<T, U extends string> = ActionsOfType<T, Constants.LOADING_STATUS, U>;

export function action<T extends string>(type: T): Action<T>;
export function action<T extends string, P>(type: T, payload: P): Action<T, P>;
export function action<T extends string, P, U extends string = string>(
  type: T,
  payload: P,
  meta: Meta<U>,
): Action<T, P, U>;
export function action(type, payload = undefined, meta = {}) {
  return is.undef(payload)
    ? {
        type,
        meta,
      }
    : {
        type,
        payload,
        error: is.instanceOf(payload, Error),
        meta,
      };
}

export const request = actions.load;

export { requesting };

export function withMeta<T extends string, P, U extends string>(
  act: Action<T, P, U>,
  meta: Partial<Meta<U>>,
): Action<T, P, U> {
  return {
    ...act,
    meta: {
      ...(act.meta || {}),
      ...meta,
    },
  };
}
