import { Box, Container, Divider, Typography } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import classroomApi from '../../../api/classroomApi';
import { User } from '../../../components/classroom/User';
import { ClassLayout } from '../../../components/layouts/ClassLayout';
import { getClassesSlug, getMaestro } from '../../../utils/dbClasses';

const AlumnosPage = ({ maestro }) => {

  const [alumnos, setAlumnos] = useState();

  const onLoadAlumnos = async() => {
    try {
        const { data } =  await classroomApi.get(`/class/${ maestro.slug }`)
        setAlumnos(data)
    } catch (error) {
        console.log(error)
    }
};

useEffect(() => {
  onLoadAlumnos();
}, [])

  return (
    <ClassLayout title={ `Personas en ${  maestro.nombre }` } diferente={ maestro.nombre } slug={ maestro.slug }>
      <Container maxWidth="sm" sx={{  }}>

      <Box flexDirection='column' display='flex' sx={{ marginRight: 'auto' }}>
        <Typography className='alumnosText' sx={{ marginTop: 5, marginBottom: 3 }}>Profesores</Typography>
        <Divider sx={{ marginBottom: 2 }} color='#c26401'/>
        <User nombre={maestro.maestro.nombre} apellidos={ maestro.maestro.apellidos }/>
      </Box>

      <Box flexDirection='column' display='flex' sx={{ marginRight: 'auto' }}>
        <Typography className='alumnosText' sx={{ marginTop: 7 }}>Compañeros de clase</Typography>
        <Divider sx={{ marginBottom: 2, marginTop: 2 }} color='#c26401'/>
        {
          alumnos?.map( alumno => (
            <Box key={ alumno._id } sx={{ marginBottom: 2 }}>
              <User nombre={alumno.nombre} apellidos={ alumno.apellidos }/>
            </Box>
          ))
        }
      </Box>
        </Container>
    </ClassLayout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths = async (ctx) => {

  const slugs = await getClassesSlug();

    return {
      paths: slugs.map( ({slug}) => ({
          params: { slug }
      })),
      fallback: "blocking"
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps = async (ctx) => {
  
  const { slug } = ctx.params;

  const maestro = await getMaestro( slug );

  return {
    props: {
      maestro
    },
    revalidate: 60 * 60 * 24
  }
}

export default AlumnosPage