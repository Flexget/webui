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
  InProgress,
  Success,
  Error,
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

export type InProgressAction<T extends string> = Action<T, unknown, InProgressRequest>;
export type ErrorAction<T extends string> = Action<T, unknown, ErrorRequest>;
export type SuccessAction<T extends string> = Action<T, unknown, SuccessRequest>;
