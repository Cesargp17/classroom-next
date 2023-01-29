import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

export const User = ({ img, nombre, apellidos }) => {
  return (
    <Box display='flex' flexDirection='row' alignItems='center'>
    <Avatar sx={{ marginLeft: 1 }}/>
        <Typography className='nombre-user' sx={{ fontWeight: 'bold', marginLeft: 1 }}> 
            { nombre }
        </Typography>&nbsp;
        <Typography className='nombre-user' sx={{ fontWeight: 'bold' }}> 
            { apellidos }
        </Typography>
    </Box>
  )
}
