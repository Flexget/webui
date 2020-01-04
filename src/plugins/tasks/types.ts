import { DefaultOptions } from 'utils/query';

export interface Task {
  name: string;
}

export interface Inject {
  title: string;
  url: string;
  fields: Record<string, any>;
}

export interface ExecuteTaskRequest {
  tasks: string[];
  inject: Inject[];
}

export interface Execution {
  abortReason?: string;
  accepted: number;
  end: string;
  failed: number;
  id: number;
  produced: number;
  rejected: number;
  start: string;
  succeeded: boolean;
  taskId: number;
}

export interface TaskStatus extends Task {
  id: number;
  lastExecutionTime: string;
  lastExecution: Execution;
}

export const enum SortByStatus {
  LastExecutionTime = 'last_execution_time',
  ID = 'id',
  Name = 'name',
  Start = 'start',
  End = 'end',
  Produced = 'produced',
  Rejected = 'rejected',
  Accepted = 'accepted',
  Failed = 'failed',
  Succeeded = 'succeeded',
}

export interface TaskStatusOptions extends DefaultOptions {
  sortBy: SortByStatus;
}

export interface TaskExecutionOptions extends DefaultOptions {
  sortBy: SortByStatus;
  endDate?: Date;
  startDate?: Date;
  produced?: boolean;
  succeeded?: boolean;
}
