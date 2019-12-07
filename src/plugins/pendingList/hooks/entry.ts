import { useReducer, Reducer, useEffect } from 'react';
import { useFlexgetAPI } from 'core/api';
import { action } from 'utils/hooks/actions';
import { Method } from 'utils/fetch';
import { createContainer } from 'unstated-next';

export const enum Constants {
  GET_ENTRIES = '@flexget/pendingList/GET_ENTRIES',
  ADD_ENTRY = '@flexget/pendingList/ADD_ENTRY',
  REMOVE_ENTRY = '@flexget/pendingList/REMOVE_ENTRY',
  INJECT_ENTRY = '@flexget/pendingList/INJECT_ENTRY',
  APPROVE_ENTRY = '@flexget/pendingList/APPROVE_ENTRY',
  REJECT_ENTRY = '@flexget/pendingList/REJECT_ENTRY',
}

const actions = {
  getEntries: 
};

type Actions = PropReturnType<typeof actions>;

const entryReducer: Reducer<State, Actions> = (state, act) =>  {
  switch(act.type) {

  }
}
