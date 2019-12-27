import { useCallback, useMemo } from 'react';
import { useFlexgetAPI } from 'core/api';
import { Method } from 'utils/fetch';
import { useContainer } from 'unstated-next';
import { createPluginContainer } from 'plugins/managedList/hooks/api';
import { EntryContainer, actions } from 'plugins/managedList/hooks/entry';
import { ListContainer } from 'plugins/managedList/hooks/list';
import { PendingListEntry, Operation, SortBy } from 'plugins/pendingList/types';
import { ActionsLeft, Actions } from 'plugins/pendingList/Card';
import { DoneAll, ClearAll } from '@material-ui/icons';

export const useEntryOperation = (entryId: number) => {
  const [{ listId }] = useContainer(ListContainer);
  const [, dispatch] = useContainer(EntryContainer);
  const [state, request] = useFlexgetAPI<PendingListEntry>(
    `/pending_list/${listId}/entries/${entryId}`,
    Method.Put,
  );

  const doOperation = useCallback(
    async (operation: Operation) => {
      const resp = await request({ operation });
      if (resp.ok) {
        dispatch(actions.updateEntry(resp.data));
      }
      return resp;
    },
    [dispatch, request],
  );

  return [state, doOperation] as const;
};

export const useEntryBulkOperation = () => {
  const [{ listId }] = useContainer(ListContainer);
  const [{ selectedIds }, dispatch] = useContainer(EntryContainer);
  const [state, request] = useFlexgetAPI<PendingListEntry[]>(
    `/pending_list/${listId}/entries/batch`,
    Method.Put,
  );

  const doOperation = useCallback(
    async (operation: Operation) => {
      const ids = [...selectedIds];
      const resp = await request({
        operation,
        ids,
      });

      if (resp.ok) {
        dispatch(actions.updateEntries(resp.data));
      }
      return resp;
    },
    [dispatch, request, selectedIds],
  );
  return [state, doOperation] as const;
};

export const PendingListContainer = createPluginContainer(() => {
  return {
    sortByOptions: useMemo(
      () => [
        {
          value: SortBy.Added,
          label: 'Date Added',
        },
        {
          value: SortBy.Title,
          label: 'Title',
        },
        {
          value: SortBy.URL,
          label: 'URL',
        },
        {
          value: SortBy.Approved,
          label: 'Approved',
        },
      ],
      [],
    ),
    card: {
      ActionsLeft,
      Actions,
    },
    useMenuProps: () => {
      const [{ loading }, doBulkOperation] = useEntryBulkOperation();
      return useMemo(
        () => [
          {
            name: 'Approve All',
            onClick: () => doBulkOperation(Operation.Approve),
            Icon: DoneAll,
            disabled: loading,
          },
          {
            name: 'Reject All',
            onClick: () => doBulkOperation(Operation.Reject),
            Icon: ClearAll,
            disabled: loading,
          },
        ],
        [doBulkOperation, loading],
      );
    },
    api: {
      list: {
        get: useFlexgetAPI('/pending_list'),
        add: useFlexgetAPI('/pending_list', Method.Post),
        remove: useFlexgetAPI(
          useCallback((listId?: number) => `/pending_list/${listId}`, []),
          Method.Delete,
        ),
      },
      entry: {
        get: useFlexgetAPI(
          useCallback(
            (listId: number, query: string) => `/pending_list/${listId}/entries?${query}`,
            [],
          ),
        ),
        add: useFlexgetAPI(
          useCallback((listId: number) => `/pending_list/${listId}/entries`, []),
          Method.Post,
        ),
        remove: useFlexgetAPI(
          useCallback(
            (listId: number, entryId: number) => `/pending_list/${listId}/entries/${entryId}`,
            [],
          ),
          Method.Delete,
        ),
        removeBulk: useFlexgetAPI(
          useCallback((listId: number) => `/pending_list/${listId}/entries/batch`, []),
          Method.Delete,
        ),
      },
    },
  };
});
