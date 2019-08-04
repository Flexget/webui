declare namespace humps {
  function camelize(value: string): string;
  function pascalize(value: string): string;
  function decamelize(value: string, optionsOrProcessor?: OptionOrProcessor): string;
  function depascalize(value: string, optionsOrProcessor?: OptionOrProcessor): string;

  function camelizeKeys<I = Object, O = Object>(str: I, optionsOrProcessor?: OptionOrProcessor): O;
  function camelizeKeys<I = Object, O = Object>(
    str: I[],
    optionsOrProcessor?: OptionOrProcessor,
  ): O[];

  function pascalizeKeys<I = Object, O = Object>(str: I, optionsOrProcessor?: OptionOrProcessor): O;
  function pascalizeKeys<I = Object, O = Object>(
    str: I[],
    optionsOrProcessor?: OptionOrProcessor,
  ): O[];

  function decamelizeKeys<I = Object, O = Object>(
    str: I[],
    optionsOrProcessor?: OptionOrProcessor,
  ): O[];
  function decamelizeKeys<I = Object, O = Object>(
    str: I,
    optionsOrProcessor?: OptionOrProcessor,
  ): O;

  function depascalizeKeys<I = Object, O = Object>(
    str: I,
    optionsOrProcessor?: OptionOrProcessor,
  ): O;
  function depascalizeKeys<I = Object, O = Object>(
    str: I[],
    optionsOrProcessor?: OptionOrProcessor,
  ): O[];

  interface HumpsOptions {
    separator?: string;
    split?: RegExp;
    process?: HumpsProcessor;
  }
  interface HumpsProcessor {
    (key: string, convert: HumpsProcessorParameter, options?: HumpsOptions): string;
  }
  interface HumpsProcessorParameter {
    (key: string, options?: HumpsOptions): string;
  }
  type OptionOrProcessor = HumpsOptions | HumpsProcessor;
}

declare module 'humps' {
  export = humps;
}
