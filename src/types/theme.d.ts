declare module '@mui/material/styles' {
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

export {};
