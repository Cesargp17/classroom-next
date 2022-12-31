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
          main: '#fff'
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
              color: 'info',
            },
            styleOverrides: {
              root: {
                textTransform: 'none',
                boxShadow: 'none',
              }
            }
          },

          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: '8px',
              }
            }
          }
      }
})