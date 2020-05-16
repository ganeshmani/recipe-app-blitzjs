import { ThemeProvider } from "@chakra-ui/core"
import theme from "../theme"
export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
