
import { InsertLink, Upload, UploadFile, YouTube } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardActionArea, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { DragFiles } from './DragFiles';
import { Link } from './Link';

export const Create = () => {

    const [isCreateSelected, setIsCreateSelected] = useState(false);
    const [Enlaces, setEnlaces] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const insertLink = (link) => {
        let EnlacesArreglo = [];
        EnlacesArreglo.push( link );
        setEnlaces(Enlaces);
    };

    const onCreatePost = async({ anuncio }) => {
        console.log(anuncio)
    }


  return (
    <>
        {
            !isCreateSelected
            ? (
                <Box sx={{ marginTop: 4, width: { xs: '100%', sm: 'auto' } }} display='flex' flexDirection='row'>
                <Card sx={{ width: 196, height: 144, marginRight: 3, display: { xs: 'none', sm: 'block' } }}>
    
                </Card>
                <Card onClick={ () => setIsCreateSelected(true) } sx={{ width: { xs: '100%', sm: 750 }, maxHeight: 72 }}>
                    <CardActionArea>
                        <Box sx={{ marginTop: 2, paddingBottom: 2 }} display='flex' flexDirection='row'>
                            <Avatar sx={{ marginRight: 2, marginLeft: 2 }} alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            <Typography sx={{ marginTop: 1, fontSize: 13, color: '#0000008C' }}>Anuncia algo a tu clase</Typography>
                        </Box>
                    </CardActionArea>
                </Card>
            </Box>
            ):(
                <form onSubmit={ handleSubmit(onCreatePost) }>
                    <Box sx={{ marginTop: 4, width: { xs: '100%', sm: 'auto' } }} display='flex' flexDirection='row'>
                    <Card sx={{ width: 196, height: 144, marginRight: 3, display: { xs: 'none', sm: 'block' } }}>
        
                    </Card>
                    <Card sx={{ width: { xs: '100%', sm: 750 }, padding: 3 }}>
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
                                // value={body}
                                // onChange={onInputChange}
                            />

                            <Box sx={{ marginTop: 2, paddingBottom: 2 }} display='flex' flexDirection='row'>
                                <Box display='flex' justifyContent='end'>

                                    <DragFiles icon={ <Upload color='blue'/> }/>

                                    <Link icon={ <InsertLink color='blue'/> } insertLink={ insertLink }/>

                                    <Link icon={ <YouTube color='blue'/> } insertLink={ insertLink }/>

                                </Box>

                                <Box sx={{ flex: 1 }}/>

                                <Box display='flex' justifyContent='start'>
                                    <Button onClick={ () => setIsCreateSelected(false) }>Cancelar</Button>
                                    <Button type='submit' color='blue'><Typography className='unirme-text'>Crear</Typography></Button>
                                </Box>
                            </Box>
                    </Card>
                </Box>
            </form>
            )
        }
    </>
  )
}