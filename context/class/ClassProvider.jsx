import React, { useReducer } from 'react'
import { ClassContext } from './ClassContext'
import { classReducer } from './classReducer'

const initialState = {
    Clases: [],
    Posts: [],
    Alumnos: [],
}

export const ClassProvider = ({ children }) => {

    const [state, dispatch] = useReducer(classReducer, initialState);

    const cargarClases = ( clases ) => {
        if( clases.length === 0 ) return;
        dispatch({ type: '[Class] - Cargar', payload: clases });
    }

    const unirseClase = ( clase ) => {
        dispatch({ type: '[Class] - Unirse', payload: clase });
    }

    const cargarAnuncios = ( anuncios ) => {
        if( anuncios.length === 0 ) return;
        dispatch({ type: '[Class] - CargarAnuncios', payload: anuncios });
    }

    const crearAnuncio = ( anuncio ) => {
        dispatch({ type: '[Class] - Crear', payload: anuncio })
    }

    const limpiarAnuncios = () => {
        dispatch({ type: '[Class] - Limpiar' })
    }

    const cargarAlumnos = ( alumnos ) => {
        if( alumnos.length === 0 ) return;
        dispatch({ type: '[Class] - CargarAlumnos', payload: alumnos })
    }

    const hacerComentario = ( comentario ) => {

        const { mensaje, autor, anuncio } = comentario;
    
        const nuevoComentario = {
            mensaje, autor
        }

        const agregarComentario = state.Posts.map( post => {
            if( post.anuncio === anuncio ){
                post.comentarios = [ ...post.comentarios, nuevoComentario ];
            }
            return post;
        });
        dispatch({ type: '[Class] - CargarAnuncios', payload: agregarComentario });

    }

  return (
    <ClassContext.Provider value={{ ...state, cargarClases, unirseClase, cargarAnuncios, crearAnuncio, limpiarAnuncios, hacerComentario, cargarAlumnos }}>
        { children }
    </ClassContext.Provider>
  )
}
