import React, { useContext, useEffect } from 'react'
import { getClassBySlug, getClassesSlug } from '../../utils/dbClasses';
import { ClassLayout } from '../../components/layouts/ClassLayout';
import { Avatar, Box, Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import { Create } from '../../components/classroom/Create';
import jwt_decode from "jwt-decode";
import classroomApi from '../../api/classroomApi';
import { useRouter } from 'next/router';
import { Posts } from '../../components/classroom/Posts';
import { ClassContext } from '../../context/class/ClassContext';

const ClassPage = ({ clase }) => {

    const { cargarAlumnos } = useContext(ClassContext);

    const onLoadAlumnos = async() => {
        try {
            const { data } =  await classroomApi.get(`/class/${ clase.slug }`)
            cargarAlumnos(data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
      onLoadAlumnos();
    }, [])
    

  return (
    <ClassLayout title={ clase.nombre } diferente={ clase.nombre } slug={ clase.slug }>
        <Box sx={{ marginTop: 3 }} flexDirection='column' display='flex' justifyContent='center' alignItems='center'>
            <Card>
                <div style={{ position: 'relative' }}>
                    <CardMedia
                        style={{ height: "240px" }}
                        component="img" 
                        image={`/img/${ clase.portadaImg }`}  
                        alt={ clase.nombre }
                    />
                    <div style={{ position: "absolute", color: "white",top: 180, left: 10 }}>
                        <Typography className='title-class' sx={{ marginBottom: 3 }} variant="h5">{ clase.nombre?.length >= 18 ? clase.nombre.substring(0,18).concat('...') : clase.nombre }</Typography>
                    </div>
                </div>
            </Card>

            <Create codigo={ clase.codigo } slug={ clase.slug } maestro={ clase.maestro }/>

        </Box>
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

    const clase = await getClassBySlug( slug );

    return {
        props: {
            clase
        },
        revalidate: 60 * 60 * 24
    }
}


export default ClassPage