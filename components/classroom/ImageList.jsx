import { Card, CardMedia, Grid } from '@mui/material'
import React from 'react'

export const ImageList = ({ images = [] }) => {
  return (
    images?.map( img => (
        <Grid item xs={4} sm={3} key={img}>
            <Card>
                <CardMedia 
                    component='img'
                    className='fadeIn'
                    image={ img }
                    alt={ img }
                />
                {/* <CardActions>
                    <Button fullWidth color="error">
                        Borrar
                    </Button>
                </CardActions> */}
            </Card>
        </Grid>
    ))
  )
}
