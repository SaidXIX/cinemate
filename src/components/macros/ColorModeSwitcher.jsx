import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react'
import { FiMoon, FiSun } from "react-icons/fi"

function ColorModeSwitcher (props) {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FiMoon, FiSun)
  return (
    <IconButton
      size="md"
      fontSize="1.35rem"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color={useColorModeValue('dark', 'light')}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  )
}

export default ColorModeSwitcher
