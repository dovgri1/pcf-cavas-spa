import { AppBar, Box, CssBaseline, Drawer, Toolbar, dividerClasses } from '@mui/material'
import * as React from 'react'
import { ApplicationTopBar } from './ApplicationTopBar';
import {ApplicationBottomNavigation} from './ApplicationBottomNavigation'
import {Theme} from './Theme';
import { ThemeProvider } from '@mui/material/styles';
import { GridComponent } from './GridComponent';


export const Application: React.FC = () => {
    const [childData, setChildData] = React.useState("");

    const handleBottomNavigationChange = (data: string) => {
        setChildData(data);
        console.log(data)
      };

    const ComponentToReturn = () => {
        if(childData == 'Selected index is 1'){
            return (
                <GridComponent></GridComponent>
            )
        }else{
            return (
                <GridComponent></GridComponent>
            )
        }

    }

    return (
        <ThemeProvider theme={Theme}>
            <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '85vh',
                    width: '100%',
                    justifyContent:'space-between'
                    }}>
                        <Box sx={{ 
                                    justifyContent:'start', 
                                    height:'15%'
                                }}>
                            <ApplicationTopBar />
                        </Box>
                        <Box sx={{
                                    justifyContent:'center', 
                                    alignItems:'center',
                                    height:'75%'
                                }}>
                                    
                            <ComponentToReturn></ComponentToReturn>
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
                            <ApplicationBottomNavigation onBottomNavigationChange={handleBottomNavigationChange} />
                        </Box>
                </Box>
        </ThemeProvider>
      
    );
  };

