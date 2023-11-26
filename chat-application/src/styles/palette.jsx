import { grey } from '@mui/material/colors';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        primary: {
          main: 'rgba(255, 255, 255, 1)',
          blue: 'rgba(42,139,242,1)',
        },
        text: {
          primary: grey[900],
          secondary: grey[800],
        },
        background: {
          paper: 'linear-gradient(to right, rgb(95,68,206), rgb(253,188,188))',
        },
      } : {
        // palette values for dark mode
        primary: {
          main: 'rgba(68,77,86,1)',
          blue: 'rgba(42,139,242,1)',
        },
        text: {
          primary: '#fff',
          secondary: '#fff',
        },
        background: {
          paper: 'rgba(20,20,20,1)'
        },
      }),
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === 'filled' && {
            backgroundColor: theme.palette.primary.main,
            color: '#fff',
          }),
        }),
      },
    },
  },
});