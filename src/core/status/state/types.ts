import { ActionsOfType } from 'utils/actions';
import { Constants, TypeMeta } from './actions';

export type RequestsOfType<ActionUnion, ActionType extends string> = ActionsOfType<
  ActionUnion,
  Constants.LOADING_STATUS,
  TypeMeta<ActionType>
>;

export interface ErrorPayload<T extends string = string> {
  message: string;
  statusCode: number;
  type: T;
}
