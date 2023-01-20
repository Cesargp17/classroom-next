import { Box, Typography, Avatar } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth/AuthContext';

export const Person = ({ subText, img = true }) => {

    const { user } = useContext(AuthContext);

  return (
    <Box sx={{ marginTop: img === false ? 2 : 0 }} display='flex' flexDirection='row'>
        <Avatar sx={{ marginRight: img === false ? 2 : 2, marginLeft: img === false ? 2 : 2 }} alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        {
          !img && (
            <Box display='flex' flexDirection='column'>
              <Typography className='nombre-user' textTransform='uppercase' sx={{ fontWeight: 'bold' }}> { user?.nombre } { user?.apellidos }</Typography>
              <Typography sx={{ fontSize: 13 }} textTransform='lowercase'> { subText ? subText : user?.email } </Typography>
          </Box>
          )
        }
    </Box>
  )
}

