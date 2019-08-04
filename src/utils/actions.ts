import { Constants } from 'core/status/state/actions';
import is from './is';

interface TypeMeta<T extends string> {
  readonly type: T;
}

interface Meta {
  readonly message?: string;
  readonly type?: string;
  readonly statusCode?: string;
}

export interface Action<T extends string> {
  readonly type: T;
  readonly meta: Meta;
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  readonly payload: P;
  readonly error: boolean;
}

export interface RequestAction<T extends string, P> extends Action<Constants.LOADING_STATUS> {
  readonly meta: TypeMeta<T>;
  readonly payload?: P;
}

type ActionCreator = (...args: any[]) => any;
interface AsyncActionCreator {
  request: ActionCreator;
  success: ActionCreator;
  failed: ActionCreator;
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
export type ActionsOfType<T, U extends string> = T extends Action<U> ? T : never;

export function action<T extends string>(type: T): Action<T>;
export function action<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function action<T extends string, P>(
  type: T,
  payload: P,
  meta: Meta,
): ActionWithPayload<T, P>;
export function action<T extends string, P>(type: T, payload?: P, meta: Meta = {}) {
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

export const request = <T extends string, P>(type: T, payload?: P): RequestAction<T, P> => ({
  type: Constants.LOADING_STATUS,
  payload,
  meta: { type },
});

export const requesting = <T extends string>(type: string) => (
  act: Action<string>,
): act is RequestAction<T, any> => act.type === Constants.LOADING_STATUS && act.meta.type === type;
