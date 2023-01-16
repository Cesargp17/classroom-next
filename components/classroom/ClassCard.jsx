import { AccountBoxOutlined, Settings } from '@mui/icons-material'
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardMedia, Divider, Grid, IconButton, Link, Typography } from '@mui/material'
import React from 'react'
import NextLink from 'next/link'
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';

export const ClassCard = ({ clase }) => {

    const user = jwt_decode( Cookies.get('token') );

  return (
    <Grid item xs={ 12 } sm={ 6 } md={ 3 } lg={ 2.4 }>
        <Card sx={{ width: 340, marginTop: 4, marginRight: 2, height: 230 }}>
          <div style={{ position: "relative" }}>
            <CardMedia 
                style={{ height: "100px" }} 
                component="img" 
                image={`/img/${ clase.portadaImg }`}  
                alt={ clase.nombre }
            /> 
                <div style={{ position: "absolute", color: "white",top: 10, left: 10 }}>
                    <NextLink href={`/class/${ clase.slug }`} passHref legacyBehavior>
                        <Link underline='hover' className='text-title-class' sx={{ marginBottom: 3 }} variant="h5">{ clase.nombre?.length >= 18 ? clase.nombre.substring(0,18).concat('...') : clase.nombre }</Link>
                    </NextLink>
                    <Typography sx={{ mt: 3 }} variant="body2">{ clase.maestro.nombre ? clase.maestro.nombre : user.nombre }</Typography>
                </div>
            </div>

            <Avatar sx={{ left:'70%', width: 75, height: 75, bottom: 50 }} alt="Remy Sharp" />
            <Divider/>

            <Box display='flex' justifyContent='end'>
                <CardActions>
                    {
                        clase.maestro._id === user._id && (
                        <IconButton>
                            <Settings sx={{ color: 'black' }}/>
                        </IconButton>
                        )
                    }
                    <IconButton>
                        <AccountBoxOutlined sx={{ color: 'black' }}/>
                    </IconButton>
              </CardActions>
            </Box>
        </Card>
    </Grid>
  )
}
