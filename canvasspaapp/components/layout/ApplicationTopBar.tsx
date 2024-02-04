
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import * as React from 'react'

export const ApplicationTopBar : React.FC = () => {
    return (
    <AppBar position='relative'>
        <Toolbar>
        <Typography fontSize={32} fontFamily={'italic'}>Macaw Application</Typography>
        </Toolbar>
    </AppBar>
    )
}