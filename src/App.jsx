import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
// import { I18nextProvider } from "react-i18next";

import Theme from '@themes/theme'
// import i18n from '@i18n/i18n'
import Router from '@routes/router'

function App () {
  const googleOAuthClientID = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID
  return (
    <GoogleOAuthProvider clientId={googleOAuthClientID}>
      <ChakraProvider theme={Theme}>
        <Router />
        <ColorModeScript />
      </ChakraProvider>
    </GoogleOAuthProvider>
  )
}

export default App
