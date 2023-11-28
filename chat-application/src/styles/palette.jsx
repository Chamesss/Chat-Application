import { grey, blue } from '@mui/material/colors';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        primary: {
          main: blue[800],
          white: 'rgba(255,255,255,1)',
          mainBg: 'rgba(255,255,255,0.85)',
          mainBgSb: 'rgba(255,255,255,1)',
          msgGrey: 'rgba(234,232,237,1)',
          msgBlue: 'rgba(42,139,242,1)',
          title: 'rgba(68,77,86,1)',
          textBlack: grey[900],
          textWhite: grey[200],
          title: 'rgba(151,151,151,1)',
          input: 'rgba(255,255,255,1)',
          button: blue[800],
          sidebar: 'rgba(255,255,255,1)',
        },
        text: {
          primary: grey[900],
          secondary: grey[800],
        },
        background: {
          paper: 'transparent',
        },
      } : {
        // palette values for dark mode
        primary: {
          main: 'rgba(34, 34, 34, 1)',
          mainBg: 'rgba(50, 50, 50, 0.85)',
          white: 'rgba(255,255,255,1)',
          msgGrey: 'rgba(44,42,47,1)',
          msgBlue: 'rgba(0,78,137,1)',
          title: 'rgba(255,255,255,1)',
          text: 'rgba(158,168,186,1)',
          svgs: 'rgba(151,151,151,1)',
          input: grey[800],
          button: blue[800],  
          sidebar: grey[800],
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
          ...(ownerState.variant === 'standard' && {
            backgroundColor: theme.palette.primary.input,
          }),
        }),
      },
    },
  },
});