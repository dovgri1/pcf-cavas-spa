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
  components:{
    MuiTablePagination: {
      styleOverrides: {
        root: {
          // Apply font size adjustments for different screen sizes
          fontSize: '1rem', // Default font size
          '@media (max-width:600px)': {
            fontSize: '0.75rem', // Smaller font size on extra-small devices
          },
          '@media (min-width:600px) and (max-width:900px)': {
            fontSize: '0.875rem', // Slightly larger font size on small devices
          },
          // Add more breakpoints as needed
        },
        selectLabel: {
          // Apply the same pattern for other inner components if needed
          fontSize: '1rem', // Default font size
          '@media (max-width:600px)': { // xs breakpoint
            fontSize: '0.75rem',
          },
          '@media (min-width:600px) and (max-width:900px)': { // sm breakpoint
            fontSize: '0.875rem',
          },
        },
        displayedRows: {
          // Repeat the pattern for displayedRows
          fontSize: '1rem',
          '@media (max-width:600px)': {
            fontSize: '0.75rem',
          },
          '@media (min-width:600px) and (max-width:900px)': {
            fontSize: '0.875rem',
          },
        },
        actions: {
          // And for actions
          fontSize: '1rem',
          '@media (max-width:600px)': {
            fontSize: '0.75rem',
          },
          '@media (min-width:600px) and (max-width:900px)': {
            fontSize: '0.875rem',
          },
        }
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
           fontSize: '1rem', 
           '@media (max-width:600px)': {
             fontSize: '0.75rem', 
           },
           '@media (min-width:600px) and (max-width:900px)': {
             fontSize: '0.875rem', 
           }
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
           fontSize: '1rem', 
           '@media (max-width:600px)': {
             fontSize: '0.75rem', 
           },
           '@media (min-width:600px) and (max-width:900px)': {
             fontSize: '0.875rem', 
           }
        }
      }
    },

  }
});
