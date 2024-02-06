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
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
    MuiButton:{
      styleOverrides:{
        root:{
          '@media (max-width:600px)': { // xs: small devices
            height: '32px',
            width: '120px',
            fontSize: '0.5rem',
            fontWeight: 600
          },
          '@media (min-width:600px)': { // sm: medium devices and up
            height: '40px',
            width: '150px',
            fontSize: '0.7rem',
            fontWeight: 600
          },
          '@media (min-width:900px)': { // md: large devices and up
            height: '48px',
            width: '170px',
            fontSize: '0.75rem',
            fontWeight: 600
          },
          
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: { // Target the root style of the component
          borderRadius: '50%', // Ensure the hover effect maintains a circular shape
          width:'60px',
          height: '60px'
        },
      }
    }
  },

});
