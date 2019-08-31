import is from './is';

export interface Meta<T extends string = string> {
  readonly message?: string;
  readonly type?: T;
  readonly statusCode?: string;
}

export interface Action<
  T extends string = string,
  P = undefined,
  U extends string | Meta<string> = string
> {
  readonly type: T;
  readonly meta: U extends string ? Meta<U> : U;
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

export type ActionsOfType<
  ActionUnion,
  Type extends string,
  MetaType extends string | Meta<string> = string
> = Extract<ActionUnion, Action<Type, any, MetaType>>;

export function action<T extends string>(type: T): Action<T>;
export function action<T extends string, P>(type: T, payload: P): Action<T, P>;
export function action<T extends string, P, U extends string | Meta<string> = string>(
  type: T,
  payload: P,
  meta: U extends string ? Meta<U> : U,
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
