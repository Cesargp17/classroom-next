import { Button, Modal, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import classroomApi from '../../api/classroomApi';
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

export const CreateClass = () => {

    const { OpenCreateClass, setOpenCreateClass } = useContext(UIContext);
    const { unirseClase } = useContext(ClassContext);

    const router = useRouter();

    const [isCreatingClass, setIsCreatingClass] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onCreateClass = async({ nombre, materia, periodo }) => {
        
        setIsCreatingClass(true);

        try {
            const { data } = await classroomApi.post('/class/create', { nombre, materia, periodo });
            router.push(`/class/${ data.slug }`)
            unirseClase(data);
            setOpenCreateClass(false);
            setIsCreatingClass(false);


        } catch (error) {
            setIsCreatingClass(false);
            console.log(error)
        }

    }

  return (
    <div>
        <Modal
            open={ OpenCreateClass }
            onClose={ () => setOpenCreateClass(false) }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}> 

            <Typography sx={{ marginRight: 'auto' }} className='crear-clase' id="modal-modal-title">
                Crear clase
            </Typography>

            <form onSubmit={ handleSubmit( onCreateClass ) }>
                <Box sx={{ width: 350 }} display='flex' flexDirection='column'>
                        <TextField 
                            sx={{ marginTop: 3 }}
                            { ...register('nombre', { 
                                required: 'Ingresa un nombre para la clase',
                                minLength: { value: 5, message: 'Minimo 5 carácteres' }
                            }) 
                        } 
                        disabled={ isCreatingClass }
                        error={ !!errors.nombre }
                        helperText={errors.nombre?.message}
                        color='blue' 
                        label="Nombre de la clase (obligatorio)" 
                        variant="filled" 
                        />

                        <TextField 
                            sx={{ marginTop: 3 }}
                            { ...register('materia', { 
                                required: 'Ingresa el nombre de la materia',
                                minLength: { value: 5, message: 'Minimo 5 carácteres' }
                            }) 
                        }
                        disabled={ isCreatingClass }
                        error={ !!errors.materia }
                        helperText={errors.materia?.message}
                        color='blue' 
                        label="Materia" 
                        variant="filled" 
                        />

                        <TextField 
                            sx={{ marginTop: 3 }}
                            { ...register('periodo', { 
                                required: 'Ingresa el periodo de la materia',
                                minLength: { value: 5, message: 'Minimo 5 carácteres' }
                            }) 
                        }
                        disabled={ isCreatingClass }
                        error={ !!errors.periodo }
                        helperText={errors.periodo?.message}
                        color='blue' 
                        label="Periodo" 
                        variant="filled" 
                        />
                </Box>
                <Box sx={{ marginTop: 3 }} display='flex' flexDirection='row' justifyContent='end'>
                    <Button onClick={ () => setOpenCreateClass(false) }>Cancelar</Button>
                    <Button disabled={ isCreatingClass } type='submit' color='blue'><Typography className='unirme-text'>Crear</Typography></Button>
                </Box>
            </form>
            
                {/* <Box display='flex' flexDirection='row'>

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

                    <Box sx={{ marginTop: 3, marginBottom: 3 }} display='flex' flexDirection='row'>
                        <TextField sx={{ width: 310 }} color='secondary' id="outlined-basic" label="Código de clase" variant="outlined" />
                        <Button color='blue' sx={{ height: 55, marginLeft: 1 }}><Typography className='unirme-text'>Unirme</Typography></Button>
                    </Box> 
                </Card>

                <Typography sx={{ color: 'black', fontSize: 15, fontWeight: 450, marginTop: 5, marginBottom: 2 }}>Para iniciar sesión con un código de clase</Typography>
                <Typography sx={{ color: '#5F6368', fontSize: 13 }}>- Usa una cuenta autorizada</Typography>
                <Typography sx={{ color: '#5F6368', fontSize: 13 }}>- Usa un código de clase con 5 o 7 letras o números, sin espacios ni símbolos</Typography> */}

            </Box>
        </Modal>
    </div>
  )
}
