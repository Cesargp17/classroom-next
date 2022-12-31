import { AccountBoxOutlined, ListAlt } from '@mui/icons-material'
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardMedia, Divider, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import { ClassroomLayout } from '../components'
import { ClassList } from '../components/classroom/ClassList'

const Clases = [
  { 
    portadaImg:'https://gstatic.com/classroom/themes/img_backtoschool.jpg', 
    nombre: '2022_102_VideoJuegos', 
    maestro: 'Juan Manuel Tovar Sánchez', 
    profileImg: '//lh3.googleusercontent.com/a-/AD5-WCkGZKVxBKfnt31VwRAfUQHMDoOjDuXoui2grhLl_Q=s75-c' 
  },
  {
    portadaImg:'https://gstatic.com/classroom/themes/img_reachout.jpg', 
    nombre: '102 NEGOCIACIÓN EMPRESARIAL', 
    maestro: 'Silvia Sofia Castrejon Zarate', 
    profileImg: '//lh3.googleusercontent.com/a-/AD5-WCkGZKVxBKfnt31VwRAfUQHMDoOjDuXoui2grhLl_Q=s75-c' 
  },
  {
    portadaImg:'https://gstatic.com/classroom/themes/img_learnlanguage.jpg', 
    nombre: '2022_102_DES_MOVIL_INTEGRAL', 
    maestro: 'Nadia Teresa Adaile Benítez', 
    profileImg: '//lh3.googleusercontent.com/a-/AD5-WCkGZKVxBKfnt31VwRAfUQHMDoOjDuXoui2grhLl_Q=s75-c' 
  },
  {
    portadaImg:'https://gstatic.com/classroom/themes/img_breakfast.jpg', 
    nombre: '2022_102_Aplicaciones web progresivas', 
    maestro: 'Juan Manuel Tovar Sánchez', 
    profileImg: '//lh3.googleusercontent.com/a-/AD5-WCkGZKVxBKfnt31VwRAfUQHMDoOjDuXoui2grhLl_Q=s75-c' 
  },
  {
    portadaImg:'https://gstatic.com/classroom/themes/img_code.jpg', 
    nombre: 'IDGS 102', 
    maestro: 'José Felix Olivares Martínez', 
    profileImg: '//lh3.googleusercontent.com/a-/AD5-WCkGZKVxBKfnt31VwRAfUQHMDoOjDuXoui2grhLl_Q=s75-c' 
  },
  {
    portadaImg:'https://gstatic.com/classroom/themes/img_bookclub.jpg', 
    nombre: '2022_102_Tutoria', 
    maestro: 'Silvia Sofia Castrejon Zarate', 
    profileImg: '//lh3.googleusercontent.com/a-/AD5-WCkGZKVxBKfnt31VwRAfUQHMDoOjDuXoui2grhLl_Q=s75-c' 
  },
]

const HomePage = () => {
  return (
    <ClassroomLayout>
      <Box>
        <Button sx={{ 
                ":hover": {
                  backgroundColor: '#f6fafe',
                  transition: 'all 0.3s ease-in-out'
                },
                mt: 2 
              }}       
            startIcon={ <ListAlt color='secondary' /> }>
          <Typography className='tareas-pendientes-text'>Tareas Pendientes</Typography>
        </Button>
      </Box>

      <ClassList clases={ Clases } />
      
    </ClassroomLayout>
  )
}

export default HomePage


// const Clase = [
//   {
//     portadaImg:'https://gstatic.com/classroom/themes/img_bookclub.jpg', 
//     nombre: '2022_102_Tutoria',
//     periodo: 'SEPTIEMBRE-DICIEMBRE 2022',
//     maestro: {
//       nombre: 'Silvia Sofia Castrejon Zarate',
//       profileImg: '//lh3.googleusercontent.com/a-/AD5-WCkGZKVxBKfnt31VwRAfUQHMDoOjDuXoui2grhLl_Q=s75-c',
//     },
//     alumnos: [
//       { nombre: 'Cesar Perez', profileImg: '//lh3.googleusercontent.com/a-/AD5-WCkGZKVxBKfnt31VwRAfUQHMDoOjDuXoui2grhLl_Q=s75-c' }
//     ],
//     tareas: [
//       { 
//         nombre: 'Crear un programa', 
//         descripcion: 'Crear un programa que sume dos numeros', 
//         entregado: [
//           { 
//             nombre: 'Cesar Perez', 
//             profileImg: '//lh3.googleusercontent.com/a-/AD5-WCkGZKVxBKfnt31VwRAfUQHMDoOjDuXoui2grhLl_Q=s75-c', 
//             archivos: { 
//               imagenes: [],
//               archivos: [],
//               links: [],
//              } 
//           }
//         ],
//         noEntregado: [
//           { 
//             nombre: 'Cesar Perez', 
//             profileImg: '//lh3.googleusercontent.com/a-/AD5-WCkGZKVxBKfnt31VwRAfUQHMDoOjDuXoui2grhLl_Q=s75-c', 
//           }
//         ] 
//       }
//     ]
//   },
// ]