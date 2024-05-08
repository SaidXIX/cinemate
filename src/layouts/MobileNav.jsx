import {
  IconButton,
  Flex,
  HStack,
  useColorModeValue
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { FiMenu } from 'react-icons/fi'

import { ColorModeSwitcher } from '@components'

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', '#171717')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <HStack spacing={{ base: '0', md: '6' }}>
        <ColorModeSwitcher />
      </HStack>
    </Flex>
  )
}

MobileNav.propTypes = {
  onOpen: PropTypes.func.isRequired
}
export default MobileNav
