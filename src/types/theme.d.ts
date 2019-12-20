import { Mixins } from '@material-ui/core/styles/createMixins';

declare module '@material-ui/core/styles/createMixins' {
  interface Mixins {
    appBar: {
      minHeight: number;
    };
    sidebar: {
      width: {
        open: number;
        closed: number;
      };
    };
  }
}
