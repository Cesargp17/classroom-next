import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useContext, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { AuthLayout } from '../../components/layouts/AuthLayout'
import { AuthContext } from '../../context/auth/AuthContext'
import { isEmail } from '../../utils/validations'
import { useSnackbar } from 'notistack';
import jwt_decode from "jwt-decode";

const LoginPage = () => {

    const { loginUser, isLoggedIn } = useContext(AuthContext);

    const checkingAuth = useMemo(() => isLoggedIn === 'checking', [isLoggedIn]);

    const { enqueueSnackbar } = useSnackbar();

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async({ email, password }) => {

        const resp = await loginUser(email, password);

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

    }

  return (
    <AuthLayout>
            <Card sx={{ width: { xs: 350, md: 448 }, padding: '10px 20px', border: 1, borderColor: '#d3dddd' }}>
                <Box display='flex' justifyContent='center' alignItems='center' sx={{ marginTop: 4 }}>
                    <img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" alt="GoogleLogo" height="24px" width="74px" style={{ marginRight: 4 }} />
                </Box>
                <Box sx={{ marginTop: 1, marginBottom: 3 }} display='flex' justifyContent='center' alignItems='center' >
                    <Typography className='login-text'>Iniciar sesión</Typography>
                </Box>

                <Box sx={{ padding: '10px 20px' }}>

                    <form onSubmit={ handleSubmit(onSubmit) } noValidate>
                        <Grid container spacing={ 2 }>
                            <Grid item xs={ 12 }>
                                <TextField 
                                type='email' 
                                    { ...register('email', { 
                                            required: 'Ingresa un email válido',
                                            validate: isEmail
                                        }) 
                                    } 
                                    label='Correo electrónico' 
                                    variant='outlined' 
                                    fullWidth
                                    color='info'
                                    error={ !!errors.email }
                                    helperText={errors.email?.message}
                                />
                            </Grid>
                        </Grid>

                        <Grid sx={{ marginTop: 1 }} container spacing={ 2 }>
                            <Grid item xs={ 12 }>
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
                        </Grid>

                    <Box sx={{ marginTop: 1, marginBottom: 3 }} display='flex' justifyContent="space-between" alignItems="center">
                            <Button sx={{ 
                                    ":hover": {
                                    backgroundColor: '#fafafa',
                                    transition: 'all 0.3s ease-in-out'
                                    },
                                    mt: 2 
                                }}   
                                onClick={ ()=>router.push('/auth/register') }     
                                >
                                <Typography className='tareas-pendientes-text'>Crear cuenta</Typography>
                            </Button>

                            {
                                checkingAuth
                                ? <Button sx={{ mt: 2 }} disabled>Ingresar</Button>
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
                                            Ingresar
                                    </Button>
                                </>
                            }
                        </Box>
                    </form>
                </Box>
            </Card>
    </AuthLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
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

export default LoginPage