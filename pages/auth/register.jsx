import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useContext, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthLayout } from '../../components/layouts/AuthLayout'
import { AuthContext } from '../../context/auth/AuthContext'
import { isEmail } from '../../utils/validations'
import { useSnackbar } from 'notistack';
import jwt_decode from "jwt-decode";

const RegisterPage = () => {

    const { registerUser, isLoggedIn } = useContext(AuthContext);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const checkingAuth = useMemo(() => isLoggedIn === 'checking', [isLoggedIn]);

    const { enqueueSnackbar } = useSnackbar();

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async({ nombre, apellidos, email, password, validation }) => {

        setIsPasswordValid(true);

        if( password !== validation ) return setIsPasswordValid(false);

        const resp = await registerUser( nombre, apellidos, email, password );

        if( resp.hasError ){
            enqueueSnackbar( resp.msg , {
                variant: 'error',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });

            return;
        }
        router.replace('/');
    };

  return (
    <AuthLayout title={ 'Registrarse - Classroom' }>
            <Card sx={{ width: { xs: 350, md: 748 }, padding: '10px 20px', border: 1, borderColor: '#d3dddd' }}>
                <Grid container spacing={2}>
                    
                    <Grid item xs={ 12 } md={ 6 }>
                    <Box display='flex' justifyContent='center' alignItems='center' sx={{ marginTop: 4 }}>
                        <img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" alt="GoogleLogo" height="24px" width="74px" style={{ marginRight: 4 }} />
                    </Box>
                    <Box sx={{ marginTop: 1, marginBottom: 3 }} display='flex' justifyContent='center' alignItems='center' >
                        <Typography className='login-text'>Crea una cuenta</Typography>
                    </Box>

                    <Box sx={{ padding: '10px 20px' }}>

                        <form onSubmit={ handleSubmit( onSubmit ) } noValidate>
                            <Grid container spacing={ 2 }>
                                <Grid item xs={ 12 } md={ 6 }>
                                    <TextField 
                                    type='text' 
                                        { ...register('nombre', { 
                                                required: 'Este campo es requerido',
                                                minLength: { value: 3, message: 'El nombre debe ser mayor a dos carácteres' }
                                            }) 
                                        } 
                                        label='Nombre' 
                                        variant='outlined' 
                                        fullWidth
                                        size='small'
                                        color='info'
                                        error={ !!errors.nombre }
                                        helperText={errors.nombre?.message}
                                    />
                                </Grid>

                                <Grid item xs={ 12 } md={ 6 }>
                                    <TextField 
                                        { ...register('apellidos', { 
                                                required: 'Este campo es requerido',
                                                minLength: { value: 3, message: 'Los apellidos deben ser mayor a dos carácteres' }
                                            }) 
                                        } 
                                        label='Apellidos'
                                        size='small'
                                        variant='outlined' 
                                        type='text' 
                                        fullWidth
                                        color='info'
                                        error={ !!errors.apellidos }
                                        helperText={errors.apellidos?.message}
                                    />
                                </Grid>

                                <Grid item xs={ 12 }>
                                    <TextField 
                                    type='email' 
                                        { ...register('email', { 
                                                required: 'Este campo es requerido',
                                                validate: isEmail
                                            }) 
                                        } 
                                        label='Correo electronico' 
                                        variant='outlined' 
                                        fullWidth
                                        size='small'
                                        color='info'
                                        error={ !!errors.email }
                                        helperText={errors.email?.message}
                                    />
                                </Grid>

                                <Grid item xs={ 12 } md={ 6 }>
                                    <TextField 
                                        { ...register('password', { 
                                                required: 'Ingresa una contraseña',
                                                minLength: { value: 6, message: 'Minimo 6 carácteres' }
                                            }) 
                                        } 
                                        label='Contraseña' 
                                        variant='outlined' 
                                        type='password' 
                                        fullWidth
                                        color='info'
                                        error={ !!errors.password }
                                        helperText={errors.password?.message}
                                    />
                                </Grid>

                                <Grid item xs={ 12 } md={ 6 }>
                                    <TextField 
                                            { ...register('validation', { 
                                                    required: 'Ingresa una contraseña',
                                                    minLength: { value: 6, message: 'Minimo 6 carácteres' }
                                                }) 
                                            } 
                                            label='Contraseña' 
                                            variant='outlined' 
                                            type='password' 
                                            fullWidth
                                            color='info'
                                            error={ !!errors.validation || isPasswordValid === false }
                                            helperText={ errors.validation?.message || isPasswordValid === false && 'Las contraseñas no coinciden'}
                                        />
                                </Grid>

                            </Grid>

                            <Box sx={{ marginTop: 1, marginBottom: 3 }} display='flex' justifyContent="space-between" alignItems="center">
                                    <Button sx={{ 
                                            ":hover": {
                                            backgroundColor: '#fafafa',
                                            transition: 'all 0.3s ease-in-out'
                                            },
                                            mt: 2 
                                        }}  
                                        onClick={ ()=>router.push('/auth/login') }     
                                        >
                                        <Typography className='tareas-pendientes-text'>Prefiero iniciar sesión</Typography>
                                    </Button>

                                    {
                                checkingAuth
                                ? <Button sx={{ mt: 2 }} disabled>Registrarse</Button>
                                : <>
                                    <Button
                                        disabled={ checkingAuth }
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
                                            >
                                            Registrarse
                                    </Button>
                                </>
                                    }
                                </Box>
                            </form>
                        </Box>
                    </Grid>
                    <Grid sx={{ display: { xs: 'none', md: 'flex' }  }} item xs={ 12 } md={ 6 }>
                        <Box display='flex' justifyContent='center' alignItems='center' sx={{ marginTop: 4 }}>
                            <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" width='244' height='244' alt="GoogleLogo" />
                        </Box>
                    </Grid>
                </Grid>
                
            </Card>
    </AuthLayout>
  )
}

export const getServerSideProps = async ({ req }) => {
    
    const { token } = req.cookies;

    if( token ){
        const user = jwt_decode( token );
        if( user ){
            return {
              redirect: {
                destination: '/',
                permanent: false,
              }
            }
          };
      };

    return {
        props: {
            
        }
    }
}

export default RegisterPage