import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import classroomApi from '../../api/classroomApi';
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'
import Cookies from 'js-cookie'

const InitialState = {
    isLoggedIn: false,
    user: undefined
};

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, InitialState);

    useEffect(() => {
        checkToken()
      }, []);

    const checkToken = async() => {

        if(!Cookies.get('token')) return;

        try {
            
            const { data } = await classroomApi.get('/user/validate-token');
            const { newToken, user } = data;
            Cookies.set('token', newToken );
            dispatch({ type: '[Auth] - Login', payload: user });

        } catch (error) {
            console.log(error)
            Cookies.remove('token');
        }

    }

    const checkingAuth = () => {
        dispatch({ type: '[Auth] - Checking' })
    }

    const errorAuth = () => {
        dispatch({ type: '[Auth] - Error' })
    }

    const loginUser = async( email, password ) => {
        
        checkingAuth();

        try {

            const { data } = await classroomApi.post('/user/login', { email, password });
            Cookies.set('token', data.token);
            dispatch({ type: '[Auth] - Login', payload: data.user });

            return {
                hasError: false
            }

        } catch (error) {

            errorAuth();

            if( axios.isAxiosError(error) ){
                return {
                    hasError: true,
                    msg: 'Credenciales incorrectas'
                }
            }
            return {
                hasError: true,
                msg: 'No se ha podido iniciar sesión'
            }
        }
    };

    const registerUser = async( nombre, apellidos, email, password ) => {
        
        checkingAuth();

        try {

            const { data } = await classroomApi.post('/user/register', { nombre, apellidos, email, password });
            Cookies.set('token', data.token);
            dispatch({ type: '[Auth] - Login', payload: data.user });

            return {
                hasError: false
            };

        } catch (error) {

            errorAuth();

            if( axios.isAxiosError(error) ){
                return {
                    hasError: true,
                    msg: error.response?.data?.msg
                }
            }
        }
        return {
            hasError: true,
            msg: 'No se pudo crear el usuario, intente de nuevo'
        }
    }

  return (
    <AuthContext.Provider value={{ ...state, registerUser, loginUser  }}>
        { children }
    </AuthContext.Provider>
  )
}
