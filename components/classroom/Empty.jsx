import { Box, Button, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { UIContext } from '../../context/ui/UIContext';

export const Empty = () => {

    const { setOpenJoinClass, setOpenCreateClass } = useContext(UIContext);

  return (
    <Box sx={{ height: '60vh' }} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
        <img src="/img/Empty.svg" alt="Empty" width='250' height='250' />
        <Typography sx={{ color: 'black', fontSize: 15, fontWeight: 450, marginTop: 5, marginBottom: 2 }}>No estas en ninguna clase.</Typography>

        <Box display='flex' flexDirection='row'>
            <Button sx={{ 
                    ":hover": {
                    backgroundColor: '#fafafa',
                    transition: 'all 0.3s ease-in-out'
                    },
                    mt: 2 
                }} 
                onClick={ () => setOpenCreateClass(true) } 
                >
                <Typography className='tareas-pendientes-text'>Crear clase</Typography>
            </Button>
            <Button
                type='submit'
                style={{
                    backgroundColor: "#1e88e5",
                    color: 'white'
                }}
                sx={{ 
                        ":hover": {
                        backgroundColor: '#fafafa',
                        transition: 'all 0.3s ease-in-out'
                        },
                        mt: 2,
                    }}
                    onClick={ () => setOpenJoinClass(true) }    
                    >
                    Unirme a clase
            </Button>
        </Box>
    </Box>
  )
}
