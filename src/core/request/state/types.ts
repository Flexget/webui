import { ActionsOfType, Action } from 'utils/actions';

export type RequestsOfType<ActionUnion, ActionType extends string> = ActionsOfType<
  ActionUnion,
  ActionType,
  InProgressRequest
>;

export interface ErrorPayload {
  message: string;
  statusCode: number;
}

export const enum RequestState {
  InProgress = 'in_progress',
  Success = 'success',
  Error = 'error',
}

interface BaseRequest {
  readonly state: RequestState;
  readonly id?: string;
}

export interface ErrorRequest extends BaseRequest {
  readonly state: RequestState.Error;
  readonly message: string;
  readonly statusCode: number;
}

export interface InProgressRequest extends BaseRequest {
  readonly state: RequestState.InProgress;
}

export interface SuccessRequest extends BaseRequest {
  readonly state: RequestState.Success;
  readonly message?: string;
}

export type Request = SuccessRequest | InProgressRequest | ErrorRequest;

export interface Requests {
  [k: string]: Request;
}

export type RequestAction = Action<string, unknown, Request>;

export type MetaFromState<U extends RequestState> = U extends RequestState.InProgress
  ? InProgressRequest
  : U extends RequestState.Error
  ? ErrorRequest
  : U extends RequestState.Success
  ? SuccessRequest
  : never;

export type ActionFromState<T extends string, U extends RequestState> = Action<
  T,
  unknown,
  MetaFromState<U>
>;

export type InProgressAction<T extends string> = ActionFromState<T, RequestState.InProgress>;
export type ErrorAction<T extends string> = ActionFromState<T, RequestState.Error>;
export type SuccessAction<T extends string> = ActionFromState<T, RequestState.Success>;
