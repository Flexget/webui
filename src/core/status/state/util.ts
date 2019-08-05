import { Action } from 'utils/actions';
import { Constants } from './actions';

export const requesting = <T extends string, P>(type: string) => (
  act: Action<string, P>,
): act is Action<Constants.LOADING_STATUS, P, T> =>
  act.type === Constants.LOADING_STATUS && act.meta.type === type;
