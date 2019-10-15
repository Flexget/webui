import { createSelector } from 'reselect';
import { State } from './reducer';
import { Requests } from './types';
import { RequestState } from './utils/types';

export const generateRequestSelector = (actions: string[]) =>
  createSelector<{ request: State; id?: string }, Requests, string | undefined, Requests>(
    ({ request }) => request.requests,
    ({ id }) => id,
    (requests, id) =>
      Object.entries(requests)
        .filter(
          ([requestAction, payload]) =>
            actions.includes(requestAction) && (!id || payload.id === id),
        )
        .reduce((acc, [requestAction, payload]) => ({ ...acc, [requestAction]: payload }), {}),
  );

export const getErrors = (requests: Requests) =>
  Object.values(requests).filter(req => req.state === RequestState.Error);

export const getInfo = (requests: Requests) =>
  Object.values(requests).filter(req => req.state === RequestState.Success);

export const anyInState = (requests: Requests, state: RequestState) =>
  Object.values(requests).some(request => request.state === state);
