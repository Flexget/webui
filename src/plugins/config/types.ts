import { IEvent } from 'monaco-editor';

export type Mode = 'config' | 'variables';

export interface Schema {
  readonly uri: string;
  readonly fileMatch?: string[];
  readonly schema?: any;
}

interface DiagnosticsOptions {
  readonly validate?: boolean;
  readonly schemas?: Schema[];
  readonly hover?: boolean;
  readonly completion?: boolean;
  readonly enableSchemaRequest?: boolean;
}

interface LanguageServiceDefaults {
  readonly onDidChange: IEvent<LanguageServiceDefaults>;
  readonly diagnosticsOptions: DiagnosticsOptions;
  setDiagnosticsOptions(options: DiagnosticsOptions): void;
}

export interface YamlLanguage {
  yamlDefaults: LanguageServiceDefaults;
}

export interface FormState {
  yaml: string;
}
