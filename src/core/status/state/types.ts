import { ActionsOfType } from 'utils/actions';
import { Constants, TypeMeta } from './actions';

export type RequestsOfType<ActionUnion, ActionType extends string> = ActionsOfType<
  ActionUnion,
  Constants.LOADING_STATUS,
  TypeMeta<ActionType>
>;
