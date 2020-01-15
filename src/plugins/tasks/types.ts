import { DefaultOptions } from 'utils/query';
import { RawEntry } from 'core/entry/types';

export interface Task {
  id: string;
  name: string;
}

export interface Inject {
  title: string;
  url: string;
  fields: Record<string, any>;
}

export interface ExecuteTaskRequest {
  tasks: string[];
  inject?: Inject[];
  learn?: boolean;
  noCache?: boolean;
  disableTracking?: boolean;
  discoverNow?: boolean;
  now?: boolean;
  progress?: boolean;
  summary?: boolean;
  entryDump?: boolean;
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

export const enum EventTypes {
  Stream = 'stream',
  Progress = 'progress',
  EntryDump = 'entry_dump',
  Summary = 'summary',
}

export const enum Status {
  Pending = 'pending',
  Running = 'running',
  Complete = 'complete',
}

export const enum Phase {}

export interface Progress {
  status: Status;
  phase: Phase;
  plugin: string;
  percent: number;
}

export interface Summary {
  accepted: number;
  rejected: number;
  failed: number;
  undecided: number;
  aborted: boolean;
  abortReason?: string;
}

interface TaskEvent {
  taskId: number;
}

export interface StreamEvent {
  stream: Task[];
}

export interface ProgressEvent extends TaskEvent {
  progress: Progress;
}

export interface EntryDumpEvent extends TaskEvent {
  entryDump: RawEntry[];
}

export interface SummaryEvent extends TaskEvent {
  summary: Summary;
}
