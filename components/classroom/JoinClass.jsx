import { Close } from '@mui/icons-material';
import { Avatar, Box, Button, Card, Divider, IconButton, Modal, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import classroomApi from '../../api/classroomApi';
import { AuthContext } from '../../context/auth/AuthContext';
import { ClassContext } from '../../context/class/ClassContext';
import { UIContext } from '../../context/ui/UIContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 520,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

export const JoinClass = () => {

    const { enqueueSnackbar } = useSnackbar();

    const { user } = useContext(AuthContext);
    const { OpenJoinClass, setOpenJoinClass } = useContext(UIContext);
    const { unirseClase } = useContext(ClassContext);
    const [isJoinningClass, setisJoinningClass] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onJoinClass = async({ codigo }) => {
        try {
            setisJoinningClass(true);
            const { data } = await classroomApi.post('/class/join', { codigo });
            unirseClase(data);
            setOpenJoinClass(false);
        } catch (error) {
            enqueueSnackbar( error?.response?.data?.msg , {
                variant: 'error',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
            setOpenJoinClass(false);
            setisJoinningClass(false);
        }
        setOpenJoinClass(false);
    }
    
  return (
    <div>
        <Modal
            open={ OpenJoinClass }
            onClose={ () => setOpenJoinClass(false) }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}> 
            
                <Box display='flex' flexDirection='row'>

                    <Typography sx={{ marginRight: 'auto' }} className='classroom-text' id="modal-modal-title" variant="h6" component="h2">
                        Unirme a clase
                    </Typography>

                    <IconButton onClick={ () => setOpenJoinClass(false) } sx={{ marginBottom: 1 }}>
                        <Close />
                    </IconButton>
                </Box>

                <Divider/>

                <Card sx={{ width: { xs: 350, md: 448 }, padding: '10px 20px', border: 1, borderColor: '#d3dddd', marginTop: 3 }}>
                    <Typography sx={{ color: '#5F6368', fontSize: 15 }}>Has iniciado sesión como</Typography>

                    <Box sx={{ marginTop: 2 }} display='flex' flexDirection='row'>
                        <Avatar sx={{ marginRight: 2 }} alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        <Typography className='nombre-user' textTransform='uppercase' sx={{ marginBottom: 1, fontWeight: 'bold' }}> { user?.nombre } { user?.apellidos } <br/> <Typography sx={{ fontSize: 13 }} textTransform='lowercase'> { user?.email } </Typography> </Typography>
                    </Box>
                </Card>

                <Card sx={{ width: { xs: 350, md: 448 }, padding: '10px 20px', border: 1, borderColor: '#d3dddd', marginTop: 3 }}>
                    <Typography sx={{ color: '#5F6368', fontSize: 18, marginTop: 2 }}>Código de clase</Typography>
                    <Typography sx={{ color: '#5F6368', fontSize: 15 }}>Pídele a tu profesor el código de clase e introdúcelo aquí.</Typography>

                    <form onSubmit={ handleSubmit( onJoinClass ) }>
                        <Box sx={{ marginTop: 3, marginBottom: 3 }} display='flex' flexDirection='row'>
                            <TextField 
                                sx={{ width: 310 }} 
                                { ...register('codigo', { 
                                    required: 'Ingresa un código de clase',
                                    minLength: { value: 6, message: 'Minimo 6 carácteres' }
                                }) 
                            } 
                            error={ !!errors.codigo }
                            helperText={errors.codigo?.message}
                                color='secondary' 
                                label="Código de clase" 
                                variant="outlined" 
                                />
                            <Button disabled={ isJoinningClass } type='submit' color='blue' sx={{ height: 55, marginLeft: 1 }}><Typography className='unirme-text'>Unirme</Typography></Button>
                        </Box> 
                    </form>
                </Card>

                <Typography sx={{ color: 'black', fontSize: 15, fontWeight: 450, marginTop: 5, marginBottom: 2 }}>Para iniciar sesión con un código de clase</Typography>
                <Typography sx={{ color: '#5F6368', fontSize: 13 }}>- Usa una cuenta autorizada</Typography>
                <Typography sx={{ color: '#5F6368', fontSize: 13 }}>- Usa un código de clase con 5 o 7 letras o números, sin espacios ni símbolos</Typography>

            </Box>
        </Modal>
    </div>
  )
}
