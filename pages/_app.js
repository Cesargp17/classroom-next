import { CssBaseline, ThemeProvider } from '@mui/material'
import '../styles/globals.css'
import { classroomTheme } from '../themes/classroom'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={ classroomTheme }>
      <CssBaseline/>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
