import { orange, blueGrey } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core';

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

export const createTheme = (type: 'light' | 'dark' = 'light') =>
  createMuiTheme({
    palette: {
      primary: {
        main: orange[800],
        ...orange,
      },
      secondary: {
        main: blueGrey[800],
        ...blueGrey,
      },
      type,
    },
    typography: {
      htmlFontSize: 10,
    },
    mixins: {
      toolbar: {
        minHeight: '5rem';
      }
    }
  });

export default createTheme();
