
import { InsertLink, MoreVert, Upload, UploadFile, YouTube } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardMedia, CircularProgress, Grid, IconButton, Menu, MenuItem, Skeleton, TextField, Typography } from '@mui/material'
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import classroomApi from '../../api/classroomApi';
import { ClassContext } from '../../context/class/ClassContext';
import { DragFiles } from './DragFiles';
import { EnlacesList } from './EnlacesList';
import { ImageList } from './ImageList';
import { Link } from './Link';
import { MiniCards } from './MiniCards';
import { Person } from './Person';
import { Posts } from './Posts';

const LinkImg = [ 'youtube' ];

export const Create = ({ codigo, slug, maestro }) => {

    const [isCreateSelected, setIsCreateSelected] = useState(false);
    const [Enlaces, setEnlaces] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [isUploadedFiles, setIsUploadedFiles] = useState(false);
    const [postOption, setPostOption] = useState('Anuncio');
    const [isCreatingPost, setIsCreatingPost] = useState(false);

    const { cargarAnuncios, crearAnuncio } = useContext( ClassContext );

    const { enqueueSnackbar } = useSnackbar();
    
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

      const onSelectPostOption = ( opcion ) => {
        setPostOption( opcion );
        handleClose();
      }

    const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        anuncio: '',
        enlaces: '',
        imagenes: ''
    });

    const insertLink = (link) => {
        setEnlaces([...Enlaces, link]);
    };

    const onFilesSelected = async( Images, Files ) => { 
        setIsUploadedFiles(true);

        let ArregloImg = [];

        try {
            for (const image of Images) {
                const formData = new FormData();
                formData.append('image', image);
                const { data } = await classroomApi.post('/class/upload', formData);
                ArregloImg.push( data.msg );
                // setuploadedImages([...uploadedImages, data.msg]);
                setIsUploadedFiles(false);
            }

            if( uploadedImages.length === 0 ){
                setUploadedImages(ArregloImg);
            } else {
                for (const image of uploadedImages) {
                    ArregloImg.push(image);
                }
                setUploadedImages(ArregloImg)
            }
        } catch (error) {
            setIsUploadedFiles(false);
            enqueueSnackbar( 'Algo ha salido mal...' , {
                variant: 'error',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
            console.log(error)
        }
    };

    const onCreatePost = async({ anuncio, titulo }) => {

        setIsCreatingPost(true);

        let isHomework = false;

        if( postOption === 'Tarea' ){
            isHomework = true;
        } else if( postOption === 'Anuncio' ){
            isHomework = false;
        };

        try {
            const { data } = await classroomApi.post('/class/posts/post', { titulo, anuncio, Enlaces, uploadedImages, codigo, isHomework });
            let comentarios = [];
            crearAnuncio({...data, comentarios})
            setIsCreateSelected(false);
            setValue('titulo', '', { shouldValidate: true });
            setValue('anuncio', '', { shouldValidate: true });
            setIsCreatingPost(false);
        } catch (error) {
            console.log(error)
            setIsCreatingPost(false);
        }
    };

  return (
   <>
    <form onSubmit={ handleSubmit(onCreatePost) }>
        <Box sx={{ marginTop: 4, width: { xs: '100%', sm: 'auto' } }} display='flex' flexDirection='row'>
            <MiniCards codigo={ codigo }/>

            <Box sx={{ width: { xs: '100%', sm: 'auto' } }} display='flex' flexDirection='column'>
                {
                    !isCreateSelected
                    ? (
                        <Card onClick={ () => setIsCreateSelected(true) } sx={{ width: { xs: '100%', sm: 750 }, maxHeight: 72 }}>
                            <CardActionArea>
                                <Box sx={{ marginTop: 2, paddingBottom: 2 }} display='flex' flexDirection='row'>
                                    <Person img={ true }/>
                                    <Typography sx={{ marginTop: 1, fontSize: 13, color: '#0000008C' }}>Anuncia algo a tu clase</Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    ) : (
                        <Card sx={{ width: { xs: '100%', sm: 750 }, padding: 3 }}>
                        {
                            postOption === 'Tarea' && (
                                <TextField
                                { ...register('titulo', { 
                                        required: postOption === 'Tarea' && 'Agrega un titulo',
                                    }) 
                                }
                                disabled={ isCreatingPost }
                                type="text"
                                variant="filled"
                                fullWidth
                                color='blue'
                                label='Titulo'
                                error={ !!errors.titulo }
                                helperText={errors.titulo?.message}
                                sx={{ marginBottom: 2 }}
                            />
                            )
                        }
                            <TextField
                                { ...register('anuncio', { 
                                        required: 'Este campo no puede estar vacio',
                                    }) 
                                } 
                                type="text"
                                variant="filled"
                                fullWidth
                                multiline
                                color='blue'
                                label='Anuncia algo a tu clase'
                                minRows={ 5 }
                                disabled={ isCreatingPost }
                                error={ !!errors.anuncio }
                                helperText={errors.anuncio?.message}
                            />
        
                            <Box sx={{ marginTop: 2, paddingBottom: 2 }} display='flex' flexDirection='row'>
                                <Box display='flex' justifyContent='end'>
        
                                    <DragFiles icon={ <Upload color={ isUploadedFiles ? 'secondary' : 'blue' }/>} onFilesSelected={ onFilesSelected } isUploadingFiles={ isUploadedFiles }/>
        
                                    <Link icon={ <InsertLink color={ isUploadedFiles ? 'secondary' : 'blue' }/> } insertLink={ insertLink } isUploadingFiles={ isUploadedFiles }/>
        
                                    <Link icon={ <YouTube color={ isUploadedFiles ? 'secondary' : 'blue' }/> } insertLink={ insertLink } isUploadingFiles={ isUploadedFiles }/>
        
                                </Box>
        
                                <Box sx={{ flex: 1 }}/>
        
                                <Box display='flex' justifyContent='start'>
                                    <Button onClick={ () => setIsCreateSelected(false) }>Cancelar</Button>
                                    <Button disabled={ isCreatingPost } type='submit' color='blue'><Typography className='unirme-text'>Crear</Typography></Button>
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
                                        <MenuItem onClick={ () => onSelectPostOption('Tarea') }>Crear tarea</MenuItem>
                                        <MenuItem onClick={ () => onSelectPostOption('Anuncio')}>Crear anuncio</MenuItem>
                                    </Menu>
                                </Box>
                            </Box>
                            <Grid container spacing={2}>
                                {
                                    isUploadedFiles
                                    ?  <Skeleton variant="rectangular" width='100%' height={118} sx={{ padding: 2, marginTop: 2 }} />
                                    : <ImageList images={ uploadedImages } />
                                }
                            </Grid>
        
                            <Grid container spacing={2}>
                                <EnlacesList enlaces={ Enlaces } />
                            </Grid>
                    </Card>
                    )
                }
                <Posts slug={ slug } maestro={maestro} />
            </Box>
        </Box>
    </form>
   </>
  )
}