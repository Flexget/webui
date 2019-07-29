import { orange, blueGrey } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  palette: {
    primary: orange,
    secondary: blueGrey,
    type: 'light',
  },
  typography: {
    htmlFontSize: 10,
  },
});

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
