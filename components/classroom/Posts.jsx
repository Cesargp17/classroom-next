import { Assignment, AssignmentOutlined, HomeWorkOutlined, Person2Outlined, Person2Rounded, Person2TwoTone, PersonSearchOutlined, Send } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardActionArea, Divider, Grid, IconButton, Skeleton, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react'
import classroomApi from '../../api/classroomApi';
import { AuthContext } from '../../context/auth/AuthContext';
import { ClassContext } from '../../context/class/ClassContext';
import { EnlacesList } from './EnlacesList';
import { ImageList } from './ImageList';
import { Person } from './Person';

export const Posts = ({ slug, maestro }) => {

    const { cargarAnuncios, hacerComentario, Posts, limpiarAnuncios, Alumnos } = useContext( ClassContext );
    const { user } = useContext(AuthContext);

    let formData = {};

    if( Posts ){
        for( let i = 0; i<= Posts.length; i++ ){
            if( Posts[i] === undefined ) break;
                 formData[Posts[i].anuncio] = ''
            }
        }


    const [isCreatingComment, setIsCreatingComment] = useState(false);
    const [isLoadingPost, setIsLoadingPost] = useState(false);
    const [texto, setTexto] = useState('');
    const [isExpandedComments, setIsExpandedComments] = useState(false);

    const onInputChange = (e) => {
        setContenido({
            [e.target.name]: e.target.value
          });
          setTexto(e.target.value);
    } 

    const { enqueueSnackbar } = useSnackbar();

    const [contenido, setContenido] = useState( formData );

    const onGetPostsClass = async() => {
        setIsLoadingPost(true);
        limpiarAnuncios();
        try {
            const { data } = await classroomApi.get(`/class/posts/${ slug }`)
            cargarAnuncios(data)
            setIsLoadingPost(false);
        } catch (error) { 
            console.log(error);
            enqueueSnackbar( 'No se ha podido cargar el contenido' , {
                variant: 'error',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
            setIsLoadingPost(false);
        }
    };

    const onCreateComment = async( anuncio ) => {

        if( texto.length === 0 ) return;

        setIsCreatingComment(true);

        try {
            const { data } = await classroomApi.post('/class/posts/comentarios', { texto, anuncio });
            console.log(data)

            const { texto: mensaje, autor } = data;

            const comentario = {
                mensaje, autor, anuncio
            };
            hacerComentario( comentario );
            setContenido( formData );
            setTexto('')
            setIsCreatingComment(false);
        } catch (error) {
            enqueueSnackbar( 'No fue posible realizar el comentario...' , {
                variant: 'error',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
            setContenido( formData );
            setTexto('')
            setIsCreatingComment(false);
            console.log(error)
        }
    }

    useEffect(() => {
      onGetPostsClass();
    }, [])

  return (
    <Box sx={{ marginTop: 4, width: { xs: '100%', sm: 'auto' } }} display='flex' flexDirection='column' >
        {
            isLoadingPost

            ?     <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton sx={{ marginBottom: 2 }} animation={false} />
            
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton sx={{ marginBottom: 2 }} animation={false} />

                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton sx={{ marginBottom: 2 }} animation={false} />

                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton sx={{ marginBottom: 2 }} animation={false} />

                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton sx={{ marginBottom: 2 }} animation={false} />
                </Box>

            : Posts?.map( post => (
                post.isHomework === "true" || post.isHomework === true
                ? (
                    <CardActionArea key={ post.anuncio } sx={{ 
                        width: { xs: '100%', sm: 750 }, 
                        padding: 2, 
                        border: 1, 
                        borderRadius: 3, 
                        borderColor: 'grey.400',
                        ":hover": {
                            backgroundColor: '#e3f2fd',
                            transition: 'all 0.3s ease-in-out'
                            },
                        marginBottom: 2
                    }}>
                        <Box display='flex' flexDirection='row' justifyContent='start' alignItems='center'>
                            <Box display='flex' sx={{ backgroundColor: '#1976d2', width: 48, padding: 1, borderRadius: 140, marginRight: 2 }}>
                                <AssignmentOutlined color='primary' sx={{ fontSize: 30 }}/>
                            </Box>
                            <Box display='flex' flexDirection='column'>
                                <Typography className='tarea-text'>{maestro.nombre} {maestro.apellidos} ha publicado nueva tarea: { post.titulo }</Typography>
                                <Typography>10/1/2023</Typography>
                            </Box>
                        </Box>
                    </CardActionArea>
                ) : (
                    <Card key={ post.anuncio } sx={{ width: { xs: '100%', sm: 750 }, padding: 1, border: 1, borderRadius: 3, borderColor: 'grey.400', marginBottom: 2 }}>
                        <Box display='flex' flexDirection='row' justifyContent='start' alignItems='center'>
                            <Box display='flex' flexDirection='column'>
                                <Box display='flex' flexDirection='row' alignItems='center'>
                                <Avatar sx={{ marginLeft: 1 }}/>
                                    <Typography className='nombre-user' sx={{ fontWeight: 'bold', marginRight: 1, marginLeft: 1 }}> 
                                        { post.autor === maestro._id ? `${ maestro.nombre +' '+maestro.apellidos }` 
                                        : Alumnos.find( alumno => alumno._id === post.autor)?.nombre }
                                    </Typography>
                                    <Typography className='nombre-user' sx={{ fontWeight: 'bold' }}> 
                                        { post.autor === maestro._id ? '' 
                                        : Alumnos.find( alumno => alumno._id === post.autor)?.apellidos }
                                    </Typography>
                                </Box>
                                <Typography sx={{ padding: 2 }} className='tarea-text2'>{ post.anuncio }</Typography>

                                <Grid container spacing={2}>
                                    <ImageList images={ post.uploadedImages } />
                                </Grid><br />

                                <Grid container spacing={2}>
                                    <EnlacesList enlaces={ post.enlaces } />
                                </Grid> <br />
                            </Box>
                        </Box>
                        <Divider/>
                        <Box>
                            <Button sx={{ 
                                    ":hover": {
                                    backgroundColor: '#f6fafe',
                                    transition: 'all 0.3s ease-in-out'
                                    },
                                    mt: 2 
                                }}
                                onClick={ () => setIsExpandedComments(!isExpandedComments) } 
                                startIcon={ <Person2Outlined color='#3c4043' /> }>
                                <Typography className='textComment'>{ post.comentarios.length === 1 ? '1 comentario de clase' : post.comentarios.length === 0 ? '' : `${ post.comentarios.length } comentarios de clase` }</Typography>
                            </Button>
                        </Box>
                        {
                            post.comentarios?.length > 0 && (
                                 post.comentarios.map( comentario => (
                                    <Box key={ comentario.contenido ? comentario.contenido : comentario.mensaje } sx={{ marginBottom: 1, marginTop: 3, marginLeft: 2 }}>
                                        <Box display='flex' flexDirection='row'>
                                            <Avatar sx={{ width: 30, height: 30, marginRight: 1 }}/>
                                            <Typography className='nombre-user' sx={{ fontWeight: 'bold', marginRight: 1 }}> 
                                                { comentario.autor === maestro._id ? `${ maestro.nombre +' '+maestro.apellidos }` 
                                                : Alumnos.find( alumno => alumno._id === comentario.autor)?.nombre }
                                            </Typography>
                                            <Typography className='nombre-user' sx={{ fontWeight: 'bold' }}> 
                                                { comentario.autor === maestro._id ? '' 
                                                : Alumnos.find( alumno => alumno._id === comentario.autor)?.apellidos }
                                            </Typography>
                                        </Box>
                                        <Typography className='tarea-text2' sx={{ marginLeft: 4 }}>{ comentario.texto ? comentario.texto : comentario.mensaje }</Typography><br />
                                    </Box>
                                ))
                                )
                            }
                        <Divider/>
                        <Box sx={{ marginTop: 2, padding: 1 }} display='flex' flexDirection='row'>
                            <Person sx={{ marginTop: 1 }} img={ true } />
                            <TextField
                            disabled={ isCreatingComment }
                            //   InputLabelProps={{style: {fontSize: 12}}} // font size of input label
                                InputProps={{
                                    endAdornment: <IconButton disabled={ isCreatingComment } onClick={ () => onCreateComment( post.anuncio ) }>
                                        <Send sx={{ fontSize: 15 }} color='blue'/>
                                    </IconButton>
                                }}
                                value={ contenido.anuncio }
                                onChange={ onInputChange }
                                name={ post.anuncio }
                                multiline
                                size='small' 
                                className="TextField-without-border-radius" 
                                sx={{ borderRadius: 6 }} 
                                fullWidth 
                                color='blue' 
                                label="Añade un comentario de clase..." 
                                variant="outlined" 
                            />
                        </Box>
                    </Card>
                )
            ))
        }
    </Box>
  )
}

