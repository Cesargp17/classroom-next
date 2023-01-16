import { Grid } from '@mui/material'
import React from 'react'
import { ClassCard } from './ClassCard'

export const ClassList = ({ clases }) => {
  return (
    <Grid container>
       {
            clases?.map( clase => (
                <ClassCard key={ clase.nombre } clase={ clase } />
            ))
       } 
    </Grid>
  )
}
