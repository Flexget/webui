import { Reducer, useReducer, useEffect } from 'react';
import { stringify } from 'qs';
import { useFlexgetAPI } from 'core/api';
import { HistoryItem, GetHistoryOptions } from './types';

interface State {
  items: HistoryItem[];
  total: number;
}

interface Action {
  items: HistoryItem[];
  headers: Headers;
  reset: boolean;
}

const historyReducer: Reducer<State, Action> = (state, { items, headers, reset }) => {
  const total = parseInt(headers.get('total-count') ?? '0', 10);
  if (reset) {
    return {
      items,
      total,
    };
  }
  return {
    items: [...state.items, ...items],
    total,
  };
};

export const useHistoryPlugin = (options: GetHistoryOptions) => {
  const [state, dispatch] = useReducer(historyReducer, { items: [], total: 0 });

  const [requestState, request] = useFlexgetAPI<HistoryItem[]>(`/history?${stringify(options)}`);

  useEffect(() => {
    const fn = async () => {
      const resp = await request();
      if (resp.ok) {
        dispatch({ items: resp.data, headers: resp.headers, reset: options.page === 1 });
      }
    };
    fn();
  }, [options.page, request]);

  return { ...state, ...requestState };
};
