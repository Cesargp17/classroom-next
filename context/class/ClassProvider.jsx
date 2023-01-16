import React, { useReducer } from 'react'
import { ClassContext } from './ClassContext'
import { classReducer } from './classReducer'

const initialState = {
    Clases: []
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

  return (
    <ClassContext.Provider value={{ ...state, cargarClases, unirseClase }}>
        { children }
    </ClassContext.Provider>
  )
}
