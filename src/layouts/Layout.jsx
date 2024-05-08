import { Outlet } from 'react-router-dom'

import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure
} from '@chakra-ui/react'

import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minHeight="100vh" bg={useColorModeValue('gray.100', '#212121')}>
      <Sidebar
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
