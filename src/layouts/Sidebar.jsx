import { Link, useLocation } from 'react-router-dom'
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Image
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { GoHomeFill } from 'react-icons/go'
import { BiSolidHelpCircle } from 'react-icons/bi'
import { MdFavorite } from 'react-icons/md'
import { IoMdBookmark } from 'react-icons/io'
import { FaFire } from 'react-icons/fa'

import { CinemateLogo, CinemateLogoDarkMode } from '@assets'

const LinkItems = [
  { name: 'Home', icon: GoHomeFill, path: '/' },
  { name: 'Trending', icon: FaFire, path: '/trending' },
  { name: 'Favorites', icon: MdFavorite, path: '/favorite' },
  { name: 'Watchlist', icon: IoMdBookmark, path: '/watchlist' },
  { name: 'Help Center', icon: BiSolidHelpCircle, path: '/help' }
]

const Sidebar = ({ onClose, ...rest }) => {
  const logoImage = useColorModeValue(CinemateLogo, CinemateLogoDarkMode)
  return (
    <Box
      bg={useColorModeValue('white', '#171717')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      spacing={10}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="5" justifyContent="space-between">
        <Image alignSelf='center' boxSize="10rem" src={logoImage} alt="nojoom-logo" />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path} onClose={onClose}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ path, icon, onClose, children, ...rest }) => {
  const activeNavItemBg = useColorModeValue('lightMode.primary', 'darkMode.primary')
  const activeNavItemColor = useColorModeValue('white', 'black')

  const location = useLocation()
  const isActive = location.pathname === path
  return (
    <Box
      as={Link}
      to={path}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="2"
        m="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={ isActive ? activeNavItemBg : 'transparent' }
        color={isActive ? activeNavItemColor : ''}
        onClick={onClose}
        _hover={{
          bg: useColorModeValue('lightMode.primary', 'darkMode.primary'),
          color: useColorModeValue('white', 'black')
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="20"
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}
NavItem.propTypes = {
  path: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any
}
Sidebar.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default Sidebar
