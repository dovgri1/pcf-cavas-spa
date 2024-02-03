import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
  palette: {
    primary: {
      main: '#fbd200',
    },
    secondary: {
      main: '#1c1c1c',
    },
    error: {
      main: '#ff0000',
    },
    background: {
      default: '#e5e5e5',
    },
  },
  // You can add more theme customizations here
});