import { AppBar, Box, Toolbar } from '@mui/material'
import * as React from 'react'

export const ApplicationTopBar : React.FC = () => {
    return (
    <AppBar style={{zIndex: 1201}} position='relative'>
        <Toolbar>
        <h3>Name of Application</h3>
        </Toolbar>
    </AppBar>
    )
}