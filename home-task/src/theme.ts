import { createTheme } from '@mui/material';


declare module '@mui/material/styles' {
  interface CommonColors {
    red: string;
    borderGray: string;
    gray: string;
  }
}

const baseTextColor = '#101828';
const primaryColor = '#003366';
const baseBorderColor = '#646F793D';
const baseFontSize = 14;

const theme = createTheme({
  components: {
    MuiDialogTitle: {
      defaultProps: {
        variant: 'h2',
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 2,
          fontSize: baseFontSize,
        },
      },
      variants: [
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            borderColor: '#00336629',
          },
        },
      ],
    },
    MuiInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          border: `1px solid ${baseBorderColor}`,
          backgroundColor: '#ffffff',
          borderRadius: 4,
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& legend': { display: 'none' },
          '& fieldset': { top: 0 },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& legend': { display: 'none' },
          '& .MuiOutlinedInput-root': {
            '& fieldset, &:hover fieldset, &.Mui-focused fieldset': {
              top: 0,
              border: `1px solid ${baseBorderColor}`,
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            padding: '8px 14px',
            backgroundColor: '#ffffff',
          },
          'label + &': {
            marginTop: 24,
          },
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: baseFontSize,
          color: baseTextColor,
          transform: 'unset !important',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'body1',
          fontWeight: 700,
        },
      },
      styleOverrides: {
        root: {
          padding: 24,
          paddingBottom: 0,
          '& .MuiCardHeader-action': {
            margin: 0,
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
        },
      },
    },
    MuiTabs: {
      defaultProps: {
        textColor: 'secondary',
        indicatorColor: 'secondary',
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: 14,

          '&.Mui-selected': {
            fontSize: 20,
            fontWeight: 700,
          },
        },
      },
    },
  },
  palette: {
    text: {
      primary: baseTextColor,
      secondary: '#8A8C8E',
      disabled: '#C7C8CA',
    },
    common: {
      red: '#E11B22',
      gray: '#646F79',
      borderGray: baseBorderColor,
    },
    background: {
      default: '#F7F7FA',
    },
    success: {
      main: '#68B561',
      contrastText: '#ffffff',
    },
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: '#E11B22',
    },
  },
  typography: {
    fontFamily: ['Catamaran', 'sans-serif'].join(','),
    fontSize: baseFontSize,
    h3: {
      fontSize: 24,
      fontWeight: 700,
    },
    h2: {
      fontSize: 28,
      fontWeight: 700,
    },
    h4: {
      fontSize: 20,
      fontWeight: 700,
    },
    h1: {
      fontSize: 40,
      fontWeight: 400,
    },
    caption: {
      fontSize: 12,
    },
    subtitle1: {
      fontSize: 16,
    },
  },
  shape: {
    borderRadius: 4,
  },
});

export default theme;
