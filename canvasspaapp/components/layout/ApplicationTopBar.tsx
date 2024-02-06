
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import * as React from 'react'

export const ApplicationTopBar : React.FC = () => {
    return (
    <AppBar position='relative'>
        <Toolbar>
        <Typography fontWeight={700} variant="h5">MACAW TEST APPLICATION</Typography>
        </Toolbar>
    </AppBar>
    )
}