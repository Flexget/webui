import { orange, blueGrey } from '@material-ui/core/colors';
import { createMuiTheme, Theme } from '@material-ui/core';

export const darkTheme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: blueGrey,
    type: 'dark',
  },
  typography: {
    htmlFontSize: 10,
  },
});

export const createTheme = (type: 'light' | 'dark' = 'light'): Theme =>
  createMuiTheme({
    palette: {
      primary: {
        main: orange[800],
      },
      secondary: {
        main: blueGrey[800],
        light: blueGrey.A200,
      },
      type,
    },
    typography: {
      htmlFontSize: 10,
    },
    mixins: {
      toolbar: {
        minHeight: '5rem',
      },
      sidebar: {
        width: {
          open: '19rem',
          closed: '6rem',
        },
      },
    },
  });

export default createMuiTheme({
  palette: {
    primary: orange,
    secondary: blueGrey,
    type: 'light',
  },
  typography: {
    htmlFontSize: 10,
  },
  mixins: {
    toolbar: {
      minHeight: '5rem',
    },
    sidebar: {
      width: {
        open: '19rem',
        closed: '6rem',
      },
    },
  },
});
