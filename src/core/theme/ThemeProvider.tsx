import React, { FC, useMemo } from 'react';
import { useContainer } from 'unstated-next';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { createTheme, ThemeContainer } from './index';

const Theme: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [type] = useContainer(ThemeContainer);

  const theme = useMemo(() => createTheme(type), [type]);

  return (
    <MuiThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </MuiThemeProvider>
  );
};

const ThemeProvider: FC<{ children?: React.ReactNode }> = ({ children }) => (
  <ThemeContainer.Provider>
    <Theme>{children}</Theme>
  </ThemeContainer.Provider>
);

export default ThemeProvider;
