import { Box } from '@mui/material'
import Head from 'next/head'
import React from 'react'

export const AuthLayout = ({ 
        children, 
        title = 'Ingresar - Classroom', 
        pageDescription = 'Comience con Google Classroom, un centro central de herramientas y recursos diseñado para ayudar a los educadores a administrar las aulas y enriquecer las experiencias de aprendizaje.' 
    }) => {
        
  return (
    <>
        <Head>
            <title>{ title }</title>
            <meta name="description" content={ pageDescription } />
            <meta name="og:title" content={ title } />
            <meta name="og:description" content={ pageDescription } />
        </Head>

        <main>
            <Box display='flex' justifyContent='center' alignItems='center' height="calc(100vh - 200px)">   
                { children }
            </Box>
        </main>
    </>
  )
}
