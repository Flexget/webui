import { DefaultOptions } from 'utils/query';
import { RawEntry } from 'core/entry/types';

export interface Task {
  id: number;
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
  AbortReason = 'abort_reason',
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
  Tasks = 'tasks',
  Progress = 'progress',
  EntryDump = 'entry_dump',
  Summary = 'summary',
  Clear = 'clear',
  SetTask = 'setTask',
}

export const enum Status {
  Pending = 'pending',
  Running = 'running',
  Complete = 'complete',
}

export const enum Phase {
  Input = 'input',
  Metainfo = 'metainfo',
  Filter = 'filter',
  Download = 'download',
  Modify = 'modify',
  Output = 'output',
  Exit = 'exit',
}

export interface Progress {
  status: Status;
  phase: Phase;
  plugin: string;
  percent: number;
}

interface Aborted {
  aborted: true;
  abortReason?: string;
}

interface NotAborted {
  accepted: number;
  rejected: number;
  failed: number;
  undecided: number;
  aborted: false;
}

export type Summary = Aborted | NotAborted;

interface BaseTaskEvent {
  taskId: number;
}

export interface TasksEvent {
  tasks: Task[];
}

export interface ProgressEvent extends BaseTaskEvent {
  progress: Progress;
}

export interface EntryDumpEvent extends BaseTaskEvent {
  entryDump: RawEntry[];
}

export interface SummaryEvent extends BaseTaskEvent {
  summary: Summary;
}

export interface TaskExecuteState extends Task {
  progress: Progress[];
  summary?: Summary;
  entries?: RawEntry[];
}
