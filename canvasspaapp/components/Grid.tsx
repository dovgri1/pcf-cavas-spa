import { Box, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid';
import * as React from 'react'
import { TableComponent } from './Table';



export const GridComponent : React.FC = () => {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <Paper sx={{ml:2, height:'100%'}}>
                        <TableComponent></TableComponent>
                    </Paper>  
                </Grid>
                <Grid item xs={6} md={4}>
                <Paper sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%', 
                    mr: 2
                }}>
            <Typography>
              Selected Record Information Goes Here
            </Typography>
          </Paper> 
                </Grid>
            </Grid>
        </Box>
    )
}