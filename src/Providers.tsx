import { lightTheme, darkTheme } from './styles/theme/defaultTheme'
import { ThemeProvider } from 'styled-components'
import { useCookies } from "react-cookie";
import { GlobalStyle } from "./styles/GlobalStyle";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({children}: ProvidersProps) => {
  const [cookie] = useCookies()
  const theme = cookie.theme === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      {children}
    </ThemeProvider>
  )
}

export default Providers