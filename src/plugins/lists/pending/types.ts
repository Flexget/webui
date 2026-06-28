import { Entry } from '../base/types';

export interface PendingListEntry extends Entry {
  approved: boolean;
}

export enum SortBy {
  Added = 'added',
  Title = 'title',
  URL = 'original_url',
  Approved = 'approved',
}

export enum Operation {
  Approve = 'approve',
  Reject = 'reject',
}
