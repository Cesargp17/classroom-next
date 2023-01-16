import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { AuthProvider } from '../context/auth/AuthProvider'
import { ClassProvider } from '../context/class/ClassProvider'
import { UIProvider } from '../context/ui/UIProvider'
import '../styles/globals.css'
import { classroomTheme } from '../themes/classroom'

export default function App({ Component, pageProps }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <ClassProvider>
          <UIProvider>
            <ThemeProvider theme={ classroomTheme }>
              <CssBaseline/>
              <Component {...pageProps} />
            </ThemeProvider>
          </UIProvider>
        </ClassProvider>
      </AuthProvider>
    </SnackbarProvider>
  )
}
