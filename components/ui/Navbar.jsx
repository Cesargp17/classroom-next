import React, { useContext, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Add, ListAlt } from '@mui/icons-material';
import { JoinClass } from '../classroom/JoinClass';
import { UIContext } from '../../context/ui/UIContext';
import { CreateClass } from '../classroom/CreateClass';
import NextLink from 'next/link'
import { Button, Link } from '@mui/material';
import { useRouter } from 'next/router';
import { useWindowWidth } from '@react-hook/window-size';

export const Navbar = ({ diferente, slug }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const { setOpenJoinClass, setOpenCreateClass } = useContext(UIContext);
  const { asPath, push } = useRouter();

  const onlyWidth = useWindowWidth();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openJoinClass = () => {
    setOpenJoinClass(true);
    handleClose();
  };

  const openCreateClass = () => {
    setOpenCreateClass(true);
    handleClose();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>

    <JoinClass/>
    <CreateClass/>

    <AppBar elevation={  onlyWidth < 600 ? 0 : 1 } position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {
          !diferente && <img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" alt="GoogleLogo" height="24px" width="74px" style={{ marginRight: 4 }} />
        }

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className='classroom-text'>{ !diferente ? 'Classroom' : diferente }</Typography>

        <Box flex={ 1.5 } />

        {
          diferente && (
            <Box display='flex' flexDirection='row' sx={{ display: { xs: 'none', sm: 'block' } }}>
                <NextLink href={ `/class/${ slug }` } passHref legacyBehavior>
                  <Button sx={{ 
                          ":hover": {
                          backgroundColor: asPath ===  `/class/${ slug }` ? '' : '#eeeeee',
                          height: 52,
                          },
                      }}
                      style={{
                        backgroundColor:  asPath ===  `/class/${ slug }` && '#bbdefb',
                        height: 52,
                    }}       
                      >
                      <Typography className={ asPath ===  `/class/${ slug }` ? 'navTextHoover' : 'navText' }>Tablón</Typography>
                  </Button>
                </NextLink>

                <NextLink href={ `/class/${ slug }/alumnos` } passHref legacyBehavior>
                  <Button sx={{ 
                          ":hover": {
                          backgroundColor: asPath ===  `/class/${ slug }/alumnos` ? '' : '#eeeeee',
                          height: 52
                          },
                      }} 
                      style={{
                        backgroundColor:  asPath ===  `/class/${ slug }/alumnos` && '#bbdefb',
                        height: 52,
                    }}          
                      >
                      <Typography className='navText'>Personas</Typography>
                  </Button>
                </NextLink>
            </Box>
          )
        }

          <Box flex={ 1 } />
          <Box flex={ 1 } />
          <Box flex={ 1 } />

          <div>
              <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Add />
              </IconButton>
              <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={ () => openCreateClass() }>Crear una clase</MenuItem>
                  <MenuItem onClick={ () => openJoinClass() }>Unirse a una clase</MenuItem>
              </Menu>
            </div>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
            //   onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
      </Toolbar>
    </AppBar>
                
          {
            diferente && (
              <AppBar position="static" sx={{ display: { xs: 'block', sm: 'none' } }}>
              <Toolbar>
                <Box flex={ 1 } />
                    <Box display='flex' flexDirection='row'>
                      <NextLink href={ `/class/${ slug }` } passHref legacyBehavior>
                        <Button sx={{ 
                                ":hover": {
                                backgroundColor: asPath ===  `/class/${ slug }` ? '' : '#eeeeee',
                                height: 52,
                                },
                            }}
                            style={{
                              backgroundColor:  asPath ===  `/class/${ slug }` && '#bbdefb',
                              height: 52,
                          }}       
                            >
                            <Typography className={ asPath ===  `/class/${ slug }` ? 'navTextHoover' : 'navText' }>Tablón</Typography>
                        </Button>
                      </NextLink>
  
                      <NextLink href='/class/2b494a1b-46ef-4787-96f0-f5264a6a7c84' passHref legacyBehavior>
                        <Button sx={{ 
                                ":hover": {
                                backgroundColor: '#eeeeee',
                                height: 52
                                },
                            }}       
                            >
                            <Typography className='navText'>Personas</Typography>
                        </Button>
                      </NextLink>
                  </Box>
                <Box flex={ 1 } />
              </Toolbar>
            </AppBar>
            )
          }
  </Box>
  )
}
