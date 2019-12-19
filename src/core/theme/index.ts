import { orange, blueGrey } from '@material-ui/core/colors';
import { createMuiTheme, Theme, PaletteType } from '@material-ui/core';

export const createTheme = (type: PaletteType = 'light'): Theme =>
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
