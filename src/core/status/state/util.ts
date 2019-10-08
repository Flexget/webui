import { Action } from 'utils/actions';
import { Constants, TypeMeta } from './actions';

export type BaseAction = Action<string, unknown, TypeMeta<string>>;

export const requesting = <T extends BaseAction>(type: string) => (act: BaseAction): act is T =>
  act.type === Constants.LOADING_STATUS && act.meta.type === type;
