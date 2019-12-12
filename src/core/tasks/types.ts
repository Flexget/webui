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
