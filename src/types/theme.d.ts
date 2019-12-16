import { CSSProperties } from 'react';

declare module '@material-ui/core/styles/createMixins' {
  interface Mixins {
    sidebar: {
      width: {
        open: CSSProperties['width'];
        closed: CSSProperties['width'];
      };
    };
  }
}
