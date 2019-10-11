import is from './is';

export interface Action<T extends string = string, P = undefined, U extends {} = {}> {
  readonly type: T;
  readonly meta: U;
  readonly payload: P;
}

export type ActionCreator = (...args: any[]) => any;
export interface AsyncActionCreator {
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

export type ActionsOfType<ActionUnion, Type extends string, Meta extends {} = {}> = Extract<
  ActionUnion,
  Action<Type, any, Meta>
>;

export function action<T extends string>(type: T): Action<T>;
export function action<T extends string, P>(type: T, payload: P): Action<T, P>;
export function action<T extends string, P, U extends {} = {}>(
  type: T,
  payload: P,
  meta: U,
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
        meta,
      };
}

export function withMeta<T extends string, P, U>(act: Action<T, P>, meta: U): Action<T, P, U> {
  return {
    ...act,
    meta: {
      ...(act.meta || {}),
      ...meta,
    },
  };
}
