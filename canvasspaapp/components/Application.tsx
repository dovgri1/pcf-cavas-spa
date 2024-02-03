import { AppBar, Box, CssBaseline, Drawer, Toolbar, dividerClasses } from '@mui/material'
import * as React from 'react'
import { ApplicationTopBar } from './ApplicationTopBar';
import {ApplicationBottomNavigation} from './ApplicationBottomNavigation'
import {Theme} from './Theme';
import { ThemeProvider } from '@mui/material/styles';
import { GridComponent } from './Grid';


export const Application: React.FC = () => {
    return (
        <ThemeProvider theme={Theme}>
            <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '85vh',
                    width: '100%',
                    justifyContent:'space-between'
                    }}>
                        <Box sx={{ justifyContent:'start', height:'15%'}}>
                            <ApplicationTopBar />
                        </Box>
                        <Box sx={{justifyContent:'center', 
                                  alignItems:'center',
                                  height:'75%'
                                }}>
                            <GridComponent></GridComponent>
                        </Box>
                        <Box sx={{ 
                            position: 'relative', 
                            width: '100%', 
                            height:'10%',
                            bottom: 0, 
                            left: 0, 
                            zIndex: 1000,
                            justifyItems:'end'
                        }}>
                            <ApplicationBottomNavigation />
                        </Box>
                </Box>
        </ThemeProvider>
      
    );
  };

