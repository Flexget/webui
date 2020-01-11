import { IEvent, Thenable } from 'monaco-editor';

export type Mode = 'config' | 'variables';

export interface Schema {
  readonly uri: string;
  readonly fileMatch?: string[];
  readonly schema?: any;
}

interface DiagnosticsOptions {
  readonly validate?: boolean;
  readonly schemas?: Schema[];
  readonly enableSchemaRequest?: boolean;
  readonly prefix?: string;
}

interface LanguageServiceDefaults {
  readonly onDidChange: IEvent<LanguageServiceDefaults>;
  readonly diagnosticsOptions: DiagnosticsOptions;
  setDiagnosticsOptions(options: DiagnosticsOptions): void;
}

export interface YamlLanguage {
  yamlDefaults: LanguageServiceDefaults;
}
