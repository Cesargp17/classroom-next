import { AccountBoxOutlined, ListAlt } from '@mui/icons-material'
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardMedia, Divider, Grid, IconButton, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { ClassroomLayout } from '../components'
import { ClassList } from '../components/classroom/ClassList'
import jwt_decode from "jwt-decode";
import { getUserClasses } from '../utils/dbClasses'
import { Empty } from '../components/classroom/Empty'
import { TareasPendientes } from '../components/classroom/TareasPendientes'
import { ClassContext } from '../context/class/ClassContext'

import jwt from "jsonwebtoken";

const HomePage = ({ clases }) => {

  const { cargarClases, Clases } = useContext( ClassContext );

  const onStartLoadClasses = () => {
    cargarClases( clases );
  }

  useEffect(() => {
    onStartLoadClasses();
  }, [])
  
  return (
    <ClassroomLayout>
      {
        Clases?.length > 0 && <TareasPendientes/>
      } 

      {
        Clases?.length === 0
        ? <Empty/>
        : <ClassList clases={ Clases } />
      }

    </ClassroomLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async ({ req }) => {

  const { token } = req.cookies;

  if( !token ){
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      }
    }
  };

  const user = jwt_decode( token );
  const { _id } = user;

  if( !user ){
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      }
    }
  };

  const clases = await getUserClasses( _id );

  return {
    props: {
      clases
    }
  }
}

export default HomePage

