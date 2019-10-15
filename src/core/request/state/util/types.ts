export interface Action<T extends symbol | string = symbol, P = undefined, U = {}> {
  readonly type: T;
  readonly payload: P;
  readonly meta: U;
}

export type UnknownAction<T extends symbol = symbol> = Action<T, unknown, unknown>;

export type ActionCreator<T extends symbol = symbol> = (...args: any[]) => UnknownAction<T>;

export const enum AsyncKeys {
  Request = 'request',
  Success = 'success',
  Failure = 'failure',
}

export interface AsyncActionCreator<
  Tr extends symbol = symbol,
  Ts extends symbol = symbol,
  Tf extends symbol = symbol
> {
  [AsyncKeys.Request]: ActionCreator<Tr>;
  [AsyncKeys.Success]: ActionCreator<Ts>;
  [AsyncKeys.Failure]: ActionCreator<Tf>;
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

export type ActionsOfType<ActionUnion, Type extends symbol, Meta extends {} = {}> = Extract<
  ActionUnion,
  Action<Type, unknown, Meta>
>;

export const enum RequestState {
  InProgress = 'inProgress',
  Success = 'success',
  Error = 'error',
}

interface BaseMeta {
  readonly state: RequestState;
  readonly id?: string;
}

export interface ErrorMeta extends BaseMeta {
  readonly state: RequestState.Error;
  readonly message: string;
  readonly statusCode: number;
}

export interface InProgressMeta extends BaseMeta {
  readonly state: RequestState.InProgress;
}

export interface SuccessMeta extends BaseMeta {
  readonly state: RequestState.Success;
  readonly message?: string;
}

export type RequestMeta = SuccessMeta | InProgressMeta | ErrorMeta;

export type AsyncAction<T extends symbol = symbol> = Action<T, unknown, RequestMeta>;

export type MetaFromState<U extends RequestState> = U extends RequestState.InProgress
  ? InProgressMeta
  : U extends RequestState.Error
  ? ErrorMeta
  : U extends RequestState.Success
  ? SuccessMeta
  : never;

export type ActionFromState<T extends symbol, U extends RequestState> = Action<
  T,
  unknown,
  MetaFromState<U>
>;
export type InProgressAction<T extends symbol = symbol> = ActionFromState<
  T,
  RequestState.InProgress
>;
export type ErrorAction<T extends symbol = symbol> = ActionFromState<T, RequestState.Error>;
export type SuccessAction<T extends symbol = symbol> = ActionFromState<T, RequestState.Success>;
