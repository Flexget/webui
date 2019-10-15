import { ActionsOfType, InProgressMeta, RequestMeta } from '../utils/actions/types';

export type RequestsOfType<ActionUnion, ActionType extends symbol> = ActionsOfType<
  ActionUnion,
  ActionType,
  InProgressMeta
>;

export interface ErrorPayload {
  message: string;
  statusCode: number;
}

export interface Requests {
  [k: string]: RequestMeta;
}
