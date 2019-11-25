export interface Action<T extends string = string, P = undefined, U = {}> {
  readonly type: T;
  readonly payload: P;
  readonly meta: U;
}

export type UnknownAction<T extends string = string> = Action<T, unknown, unknown>;

export type ActionCreator<T extends string = string> = (...args: any[]) => UnknownAction<T>;

// TODO: request | Receive | error
export const enum AsyncKeys {
  Request = 'request',
  Success = 'success',
  Failure = 'failure',
}

export interface AsyncActionCreator<
  Tr extends string = string,
  Ts extends string = string,
  Tf extends string = string
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

export type ActionsOfType<ActionUnion, Type extends string, Meta extends {} = {}> = Extract<
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

export type AsyncAction<T extends string = string> = Action<T, unknown, RequestMeta>;

export type MetaFromState<U extends RequestState> = U extends RequestState.InProgress
  ? InProgressMeta
  : U extends RequestState.Error
  ? ErrorMeta
  : U extends RequestState.Success
  ? SuccessMeta
  : never;

export type ActionFromState<
  ActionUnion,
  ActionType extends string,
  State extends RequestState
> = ActionsOfType<ActionUnion, ActionType, MetaFromState<State>>;

export type InProgressAction<ActionUnion, T extends string = string> = ActionFromState<
  ActionUnion,
  T,
  RequestState.InProgress
>;
export type ErrorAction<ActionUnion, T extends string = string> = ActionFromState<
  ActionUnion,
  T,
  RequestState.Error
>;
export type SuccessAction<ActionUnion, T extends string = string> = ActionFromState<
  ActionUnion,
  T,
  RequestState.Success
>;

export type RequestsOfType<ActionUnion, ActionType extends string> = InProgressAction<
  ActionUnion,
  ActionType
>;
