import Head from 'next/head'
import React from 'react'
import { Navbar } from '../ui/Navbar'

export const ClassLayout = ({
        children, 
        title = 'Clases', 
        pageDescription = 'Comience con Google Classroom, un centro central de herramientas y recursos diseñado para ayudar a los educadores a administrar las aulas y enriquecer las experiencias de aprendizaje.', 
        diferente = false,
        slug = ''
    }) => {

  return (
        <>
        <Head>
            <title>{ title }</title>
            <meta name="description" content={ pageDescription } />
            <meta name="og:title" content={ title } />
            <meta name="og:description" content={ pageDescription } />
        </Head>

        <nav>
            <Navbar diferente={ diferente } slug={ slug }/>
        </nav>

        <main style={{ padding: '0px 30px' }}>
            { children }
        </main>
    </>
  )
}
