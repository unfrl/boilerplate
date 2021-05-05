import { createMuiTheme } from '@material-ui/core';
import primary from '@material-ui/core/colors/deepOrange';
import secondary from '@material-ui/core/colors/indigo';

export const theme = (darkMode: boolean) =>
  createMuiTheme({
    palette: {
      primary: primary,
      secondary: secondary,
      type: darkMode ? 'dark' : 'light',
    },
    props: {
      MuiButtonBase: {
        disableRipple: true,
      },
      MuiButton: {
        disableElevation: true,
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: '2px',
        },
      },
      MuiPaper: {
        rounded: {
          borderRadius: '2px',
        },
      },
      MuiInputBase: {
        root: {
          borderRadius: '2px',
        },
      },
      MuiOutlinedInput: {
        root: {
          borderRadius: '2px',
        },
      },
    },
  });
