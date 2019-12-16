import React, { FC, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { createTheme } from './index';

interface Props {
  type?: 'light' | 'dark';
}

const ThemeProvider: FC<Props> = ({ type = 'light', children }) => {
  const theme = useMemo(() => createTheme(type), [type]);

  return (
    <MuiThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
