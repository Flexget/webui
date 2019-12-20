import React, { FC, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { createTheme, ThemeContainer } from './index';

const Theme: FC = ({ children }) => {
  const [type] = ThemeContainer.useContainer();

  const theme = useMemo(() => createTheme(type), [type]);

  return (
    <MuiThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </MuiThemeProvider>
  );
};

const ThemeProvider: FC = ({ children }) => (
  <ThemeContainer.Provider>
    <Theme>{children}</Theme>
  </ThemeContainer.Provider>
);

export default ThemeProvider;
