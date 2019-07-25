import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import blueGrey from '@material-ui/core/colors/blueGrey';

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
