import { ListAlt } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const TareasPendientes = () => {
  return (
    <Box>
        <Button sx={{ 
                ":hover": {
                backgroundColor: '#f6fafe',
                transition: 'all 0.3s ease-in-out'
                },
                mt: 2 
            }}       
            startIcon={ <ListAlt color='secondary' /> }>
            <Typography className='tareas-pendientes-text'>Tareas Pendientes</Typography>
        </Button>
    </Box>
  )
}
