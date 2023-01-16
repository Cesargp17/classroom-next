import { Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 280,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

export const Link = ({ icon, insertLink }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [Link, setLink] = useState('');

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onInsertLink = () => {

        if( Link.length < 1 ){
            setShowError( true );
            setErrorMessage('Ingresa un enlace');
            return;
        }

        insertLink(Link);
        handleClose();
        setLink('');
        setShowError( false );
        setErrorMessage('');
    }

  return (
    <div>
        <IconButton onClick={handleOpen}>
            { icon }
        </IconButton>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography sx={{ marginBottom: 2 }}>Añadir enlace</Typography>
        <TextField
            type="text"
            variant="filled"
            fullWidth
            multiline
            color='blue'
            label='Enlace'
            value={Link}
            onChange={( e ) => setLink( e.target.value )}
            error={ showError }
            helperText={ errorMessage }
        /> 
            <Box sx={{ marginTop: 2, marginLeft: 10 }} display='flex' justifyContent='start'>
                <Button onClick={ handleClose }>Cancelar</Button>
                <Button onClick={ () => onInsertLink() } color='blue'><Typography className='unirme-text'>Crear</Typography></Button>
            </Box>       
        </Box>
        </Modal>
    </div>
  )
}
