import { Close } from '@mui/icons-material';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import React from 'react'
import Dropzone from 'react-dropzone';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

export const DragFiles = ({ icon }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onDropFiles = ( acceptedFiles ) => {
        console.log(acceptedFiles)
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
            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' sx={style}>
                <IconButton onClick={ handleClose } sx={{ marginLeft: 'auto' }}>
                    <Close/>
                </IconButton>

                    <Dropzone onDrop={acceptedFiles => onDropFiles( acceptedFiles )}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'style={{ height: 400, width: 700 }} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img src="/img/Drag.png" alt="Drag" width='300px' height='180px' />
                            <Typography sx={{ marginBottom: 10 }}>Arrastra aqui tus archivos o selecciona aquí tus archivos</Typography>
                        </Box>
                        </section>
                    )}
                    </Dropzone>
            </Box>
        </Modal>
    </div>
  )
}
