import { Entry } from '../managedList/types';

export interface PendingListEntry  extends Entry {
  approved: boolean;
}

export const enum SortBy {
  Added = 'added',
  Title = 'title',
  URL = 'original_url',
  Approved = 'approved'
}

export const enum Operation {
  Approve = 'approve',
  Reject = 'reject',
}
