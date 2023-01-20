import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export const EnlacesList = ({ enlaces = [] }) => {
  return (
      enlaces?.map( enlace => (
          <Grid sx={{ marginRight: 4 }} item xs={6} sm={4} md={3} key={enlace}>
              <Box sx={{ width: 200, height: 60, border: 1, borderRadius: 3, borderColor: 'grey.400',  }}>
                  <Box sx={{ marginTop: 1, marginBottom: 1 }} display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                    {/* <CardMedia
                        sx={{ width: 50, marginRight: 1 }}
                        component='img'
                        image={ enlace.startsWith('https://www.youtube') ? 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png' : 'https://cdn-icons-png.flaticon.com/512/44/44493.png' }
                    /> */}
                    <Image 
                      src={  enlace.startsWith('https://www.youtube') ? '/img/Youtube.png' : '/img/Enlace.png' } 
                      alt={ 'ImageLink' }
                      width={ enlace.startsWith('https://www.youtube') ? 50 : 40 }
                      height={ 40 }
                    />
                      <Link target="_blank" className='tarea-text' sx={{ marginLeft: 2 }} href={ enlace } color="blue.main" underline='hover'>
                          { enlace.startsWith('https://www.youtube') ? 'Enlace de Video' : 'Enlace sitio web' }
                      </Link>
                    </Box>
              </Box>
          </Grid>
      ))

  )
}
