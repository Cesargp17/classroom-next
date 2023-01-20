import { CopyAll, InsertLink, MoreVert } from '@mui/icons-material'
import { Box, Card, IconButton, Link, Menu, MenuItem, Typography } from '@mui/material'
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react'
import { ClassContext } from '../../context/class/ClassContext';
import NextLink from 'next/link'

export const MiniCards = ({ codigo }) => {

    const { enqueueSnackbar } = useSnackbar();
    const { cargarAnuncios, crearAnuncio, Posts, limpiarAnuncios } = useContext( ClassContext );

    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

      const handleCopyCode = () => {
        navigator.clipboard.writeText(codigo);
        enqueueSnackbar( 'Código de clase copiado ' , {
            variant: 'success',
            autoHideDuration: 1500,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        });
        handleClose();
      }

  return (
    <Box display='flex' flexDirection='column'>
        <Box sx={{ width: 196, height: 98, marginRight: 3, display: { xs: 'none', sm: 'block' }, border: 1, borderRadius: 3, borderColor: 'grey.400' }}>

        <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
        <Typography className='claseCodeText' sx={{ padding: 1 }}>Código de clase</Typography>
            <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                >
                <MoreVert />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                <MenuItem onClick={ () => console.log('Copy Code') }><InsertLink sx={{ marginRight: 2 }}/>Copiar enlace de invitación a la clase</MenuItem>
                <MenuItem onClick={ () => handleCopyCode() }><CopyAll sx={{ marginRight: 2 }}/>Copiar el código de la clase</MenuItem>
            </Menu>
            </div>
        </Box>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Typography className='codeText' sx={{ marginTop: 0.5 }}>{codigo}</Typography>
                </Box>

        </Box><br />
        <Box sx={{ width: 196, height: 144, marginRight: 3, display: { xs: 'none', sm: 'block' }, border: 1, borderRadius: 3, borderColor: 'grey.400', padding: 2 }}>
            {
                Posts?.filter( post => post.isHomework === "true" || post.isHomework === true )?.length === 0 
                ? (
                    <>
                        <Typography className='tarea-text'>Próximas entregas</Typography>
                        <Typography sx={{ padding: 2 }} className='tarea-text2'>¡Yuju! ¡No tienes que entregar nada pronto!</Typography>
                    </>
                ) : (
                    <>
                    <Typography  sx={{ marginBottom: 1 }} className='tarea-text'>Próximas entregas</Typography>
                    {
                    Posts?.filter( post => post.isHomework === "true" || post.isHomework === true ).map( (tarea, i) => (
                        <NextLink key={tarea.titulo} href='/' passHref legacyBehavior>
                            <Link sx={{ color: 'blue.main' }} underline='hover'>
                                <Typography className='tarea-text2'>{ i + 1 }- { tarea.titulo }</Typography>
                            </Link>
                        </NextLink>
                        ))
                    }
                    </>
                )
            }
        </Box>
    </Box>
  )
}
