import { useState, useCallback } from 'react';
import { createContainer } from 'unstated-next';
import { editor } from 'monaco-editor';
import { common, orange, blueGrey } from '@material-ui/core/colors';
import { createMuiTheme, Theme, PaletteType } from '@material-ui/core';
import { rgba } from 'polished';
import lightEditorTheme from 'monaco-themes/themes/Tomorrow.json';
import darkEditorTheme from 'monaco-themes/themes/Oceanic Next.json';

export const ThemeContainer = createContainer(() => {
  const [state, setState] = useState<PaletteType>('light');

  const toggle = useCallback(() => setState(state === 'light' ? 'dark' : 'light'), [state]);

  return [state, toggle] as const;
});

const dark = {
  text: {
    primary: blueGrey.A200,
    secondary: rgba(blueGrey.A200, 0.7),
    disabled: rgba(blueGrey.A200, 0.5),
    hint: rgba(blueGrey.A200, 0.5),
    icon: rgba(blueGrey.A200, 0.5),
  },
  divider: rgba(blueGrey.A200, 0.12),
  background: {
    paper: blueGrey[800],
    default: blueGrey[900],
  },
  action: {
    active: blueGrey.A200,
    hover: rgba(blueGrey.A200, 0.1),
    hoverOpacity: 0.1,
    selected: rgba(blueGrey.A200, 0.2),
    disabled: rgba(blueGrey.A200, 0.3),
    disabledBackground: rgba(blueGrey.A200, 0.12),
  },
};

const light = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: rgba(blueGrey[800], 0.87),
    // Secondary text.
    secondary: rgba(blueGrey[800], 0.54),
    // Disabled text have even lower visual prominence.
    disabled: rgba(blueGrey[800], 0.38),
    // Text hints.
    hint: rgba(blueGrey[800], 0.38),
  },
  // The color used to divide different elements.
  divider: rgba(blueGrey[800], 0.12),
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: common.white,
    default: blueGrey[50],
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: rgba(blueGrey[800], 0.54),
    // The color of an hovered action.
    hover: rgba(blueGrey[800], 0.08),
    hoverOpacity: 0.08,
    // The color of a selected action.
    selected: rgba(blueGrey[800], 0.14),
    // The color of a disabled action.
    disabled: rgba(blueGrey[800], 0.26),
    // The background color of a disabled action.
    disabledBackground: rgba(blueGrey[800], 0.12),
  },
};

const themes = {
  light,
  dark,
} as const;

const addEditorTheme = (name: PaletteType, data: editor.IStandaloneThemeData) =>
  editor?.defineTheme(name, {
    ...data,
    colors: {
      ...data.colors,
      'editor.background': themes[name].background.default,
    },
  });

addEditorTheme('light', lightEditorTheme as editor.IStandaloneThemeData);
addEditorTheme('dark', darkEditorTheme as editor.IStandaloneThemeData);

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
      ...themes[type],
    },
    typography: {
      htmlFontSize: 10,
    },
    mixins: {
      toolbar: {
        minHeight: '5rem',
      },
      appBar: {
        minHeight: 50,
      },
      sidebar: {
        width: {
          open: 238,
          closed: 60,
        },
      },
    },
    props: {
      MuiPaper: {
        square: true,
      },
    },
  });
