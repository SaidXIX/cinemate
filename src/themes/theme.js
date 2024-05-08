import { extendTheme } from '@chakra-ui/react'

// Supports weights 200-800
import '@fontsource/poppins'
import '@fontsource-variable/changa'

const Theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true
  },
  colors: {
    lightMode: {
      primary: '#3182CE',
      secondary: '#F2A50A',
      background: '#FFFFFF',
      inputBackground: '#FFFFFF',
      text: '#1A2E4A',
      borderColor: '#E3E3E9'
    },
    darkMode: {
      primary: '#63B3ED',
      secondary: '#1D2B83',
      background: '#1C1C1E',
      inputBackground: '#111111',
      text: '#F1F1F1',
      borderColor: '#373737'
    }
  },
  fonts: {
    heading: 'Poppins, Changa',
    body: 'Poppins, Changa'
  },
  fontDisplay: 'swap'
})

export default Theme
