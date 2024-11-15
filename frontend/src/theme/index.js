import { createTheme, alpha } from '@mui/material/styles';

// Custom color palette inspired by modern UI design
const customColors = {
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: customColors.blue[600],
      light: customColors.blue[500],
      dark: customColors.blue[700],
      contrastText: '#ffffff',
      lighter: alpha(customColors.blue[600], 0.04),
    },
    secondary: {
      main: customColors.indigo[600],
      light: customColors.indigo[500],
      dark: customColors.indigo[700],
      contrastText: '#ffffff',
    },
    background: {
      default: customColors.slate[50],
      paper: '#ffffff',
      subtle: alpha(customColors.blue[50], 0.5),
      card: '#ffffff',
      tooltip: alpha(customColors.slate[900], 0.96),
      backdrop: alpha(customColors.slate[900], 0.6),
    },
    text: {
      primary: customColors.slate[900],
      secondary: customColors.slate[600],
      disabled: customColors.slate[400],
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    info: {
      main: customColors.blue[500],
      light: customColors.blue[400],
      dark: customColors.blue[600],
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    divider: alpha(customColors.slate[900], 0.08),
    action: {
      active: customColors.slate[600],
      hover: alpha(customColors.slate[600], 0.04),
      selected: alpha(customColors.blue[600], 0.08),
      disabled: alpha(customColors.slate[400], 0.38),
      disabledBackground: alpha(customColors.slate[400], 0.12),
      focus: alpha(customColors.blue[600], 0.12),
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      letterSpacing: '0.02em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
          backgroundColor: customColors.slate[50],
        },
        '#root': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        },
        'input[type=number]': {
          MozAppearance: 'textfield',
          '&::-webkit-outer-spin-button': {
            margin: 0,
            WebkitAppearance: 'none',
          },
          '&::-webkit-inner-spin-button': {
            margin: 0,
            WebkitAppearance: 'none',
          },
        },
        '#nprogress': {
          pointerEvents: 'none',
        },
        '#nprogress .bar': {
          backgroundColor: customColors.blue[600],
          height: 3,
          left: 0,
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 2000,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(customColors.slate[900], 0.6),
          backdropFilter: 'blur(4px)',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          fontWeight: 600,
          padding: '10px 20px',
          transition: 'all 150ms ease-in-out',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          padding: '9px 19px',
          '&:hover': {
            borderWidth: '1.5px',
            backgroundColor: alpha(customColors.blue[600], 0.04),
          },
        },
        text: {
          '&:hover': {
            backgroundColor: alpha(customColors.blue[600], 0.04),
          },
        },
        sizeLarge: {
          padding: '12px 24px',
          fontSize: '1rem',
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.812rem',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: `1px solid ${alpha(customColors.slate[300], 0.4)}`,
          backgroundImage: 'none',
          padding: '24px',
          transition: 'all 200ms ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 12px 24px ${alpha(customColors.slate[900], 0.06)}`,
            borderColor: alpha(customColors.slate[300], 0.6),
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '24px 24px 0',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '0 24px 24px',
          justifyContent: 'flex-end',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: alpha('#ffffff', 0.95),
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${alpha(customColors.slate[300], 0.2)}`,
          backgroundImage: 'none',
          boxShadow: 'none',
        },
        colorDefault: {
          backgroundColor: alpha('#ffffff', 0.95),
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${alpha(customColors.slate[300], 0.2)}`,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '64px !important',
          padding: '0 24px',
          '@media (min-width: 600px)': {
            padding: '0 32px',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '24px',
          paddingRight: '24px',
          '@media (min-width: 600px)': {
            paddingLeft: '32px',
            paddingRight: '32px',
          },
        },
        maxWidthLg: {
          '@media (min-width: 1280px)': {
            maxWidth: '1280px',
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
      styleOverrides: {
        root: {
          color: customColors.blue[600],
          fontWeight: 500,
          transition: 'color 150ms ease-in-out',
          '&:hover': {
            color: customColors.blue[700],
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          marginBottom: 4,
          padding: '8px 12px',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          borderRadius: 10,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(customColors.slate[300], 0.4),
            transition: 'all 150ms ease-in-out',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(customColors.slate[300], 0.6),
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: customColors.blue[600],
            borderWidth: '1.5px',
          },
        },
        input: {
          padding: '12px 16px',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          borderBottom: `2px solid ${alpha(customColors.slate[300], 0.2)}`,
          '& .MuiTableCell-root': {
            borderBottom: 'none',
            fontSize: '0.875rem',
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            color: customColors.slate[500],
          },
          '& .MuiTableCell-paddingCheckbox': {
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            transition: 'all 150ms ease-in-out',
            '&:hover': {
              backgroundColor: alpha(customColors.slate[500], 0.02),
            },
            '&.Mui-focused': {
              backgroundColor: alpha(customColors.blue[500], 0.02),
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: customColors.blue[500],
                borderWidth: '2px',
              },
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        paper: {
          backgroundColor: alpha('#ffffff', 0.95),
          backdropFilter: 'blur(8px)',
          borderRadius: 12,
          border: `1px solid ${alpha(customColors.slate[300], 0.2)}`,
          boxShadow: `0 4px 20px ${alpha(customColors.slate[900], 0.08)}`,
          marginTop: 8,
          '& .MuiList-root': {
            padding: '6px',
          },
          '& .MuiMenuItem-root': {
            borderRadius: 8,
            margin: '2px 0',
            padding: '10px 12px',
            transition: 'all 150ms ease-in-out',
            '&:hover': {
              backgroundColor: alpha(customColors.blue[500], 0.05),
            },
            '&.Mui-selected': {
              backgroundColor: alpha(customColors.blue[500], 0.08),
              '&:hover': {
                backgroundColor: alpha(customColors.blue[500], 0.12),
              },
            },
          },
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRadius: 12,
          border: `1px solid ${alpha(customColors.slate[300], 0.2)}`,
          boxShadow: `0 4px 20px ${alpha(customColors.slate[900], 0.08)}`,
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        PaperProps: {
          elevation: 0,
        },
      },
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRadius: 20,
          border: `1px solid ${alpha(customColors.slate[300], 0.2)}`,
          boxShadow: `0 25px 50px -12px ${alpha(customColors.slate[900], 0.25)}`,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
          fontWeight: 600,
          padding: '24px 24px 12px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '12px 24px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '12px 24px 24px',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
        },
        switchBase: {
          padding: 1,
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: customColors.blue[500],
              opacity: 1,
              border: 'none',
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: `1px solid ${customColors.slate[400]}`,
          backgroundColor: customColors.slate[100],
          opacity: 1,
          transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${alpha(customColors.slate[300], 0.2)}`,
        },
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
          backgroundColor: customColors.blue[500],
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          padding: '12px 16px',
          minHeight: 48,
          '&.Mui-selected': {
            color: customColors.blue[600],
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '12px 16px',
        },
        standardSuccess: {
          backgroundColor: alpha('#10b981', 0.12),
          color: '#059669',
          '& .MuiAlert-icon': {
            color: '#059669',
          },
        },
        standardError: {
          backgroundColor: alpha('#ef4444', 0.12),
          color: '#dc2626',
          '& .MuiAlert-icon': {
            color: '#dc2626',
          },
        },
        standardWarning: {
          backgroundColor: alpha('#f59e0b', 0.12),
          color: '#d97706',
          '& .MuiAlert-icon': {
            color: '#d97706',
          },
        },
        standardInfo: {
          backgroundColor: alpha(customColors.blue[600], 0.12),
          color: customColors.blue[700],
          '& .MuiAlert-icon': {
            color: customColors.blue[700],
          },
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiAlert-root': {
            backgroundColor: alpha('#ffffff', 0.98),
            backdropFilter: 'blur(12px)',
            border: `1px solid ${alpha(customColors.slate[300], 0.2)}`,
            boxShadow: `0 8px 32px ${alpha(customColors.slate[900], 0.08)}`,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: 28,
          '&.MuiChip-filled': {
            backgroundColor: alpha(customColors.slate[200], 0.5),
          },
          '&.MuiChip-outlined': {
            borderColor: alpha(customColors.slate[300], 0.5),
          },
        },
        label: {
          fontWeight: 500,
          fontSize: '0.812rem',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: alpha(customColors.slate[900], 0.96),
          backdropFilter: 'blur(12px)',
          borderRadius: 8,
          padding: '8px 12px',
          fontSize: '0.812rem',
          fontWeight: 500,
        },
        arrow: {
          color: alpha(customColors.slate[900], 0.96),
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: alpha(customColors.slate[100], 0.5),
          },
          '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${alpha(customColors.slate[300], 0.2)}`,
          },
          '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    'none',
    `0 1px 2px ${alpha(customColors.slate[900], 0.05)}`,
    `0 1px 3px ${alpha(customColors.slate[900], 0.08)}`,
    `0 4px 6px -2px ${alpha(customColors.slate[900], 0.1)}`,
    `0 6px 8px -2px ${alpha(customColors.slate[900], 0.12)}`,
    `0 8px 12px -3px ${alpha(customColors.slate[900], 0.15)}`,
    `0 12px 16px -4px ${alpha(customColors.slate[900], 0.18)}`,
    `0 16px 24px -6px ${alpha(customColors.slate[900], 0.22)}`,
    `0 20px 28px -8px ${alpha(customColors.slate[900], 0.25)}`,
    `0 25px 35px -10px ${alpha(customColors.slate[900], 0.3)}`,
    ...Array(15).fill('none'),
  ],
  mixins: {
    toolbar: {
      minHeight: 64,
    },
  },
});

export default theme;