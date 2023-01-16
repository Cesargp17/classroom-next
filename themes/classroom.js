import { createTheme } from "@mui/material";

export const classroomTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#fafafa'
        },
        secondary: {
          main: '#42a5f5'
        },
        info: {
          main: '#1e88e5'
        },
        white: {
          main: '#fff'
        },
        blue: {
          main: '#1976d2'
        },
        text: {
          main: '#5F6368'
        }
      },
      components: {
        MuiAppBar: {
            defaultProps: {
              elevation: 1,
              position: 'fixed',
            },
            styleOverrides: {
              root: {
                backgroundColor: 'white',
                height: 60
              },
            }
          },

          MuiButton: {
            defaultProps: {
              variant: 'contained',
              disableElevation: true,
              color: 'white',
            },
            styleOverrides: {
              root: {
                textTransform: 'none',
                boxShadow: 'none',
              }
            }
          },
      }
})