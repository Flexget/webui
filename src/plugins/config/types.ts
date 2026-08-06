export type Mode = 'config' | 'variables';

export interface Schema {
  readonly uri: string;
  readonly fileMatch?: string[];
  readonly schema?: any;
}

export interface FormState {
  yaml: string;
}
