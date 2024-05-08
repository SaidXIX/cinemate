import { IconButton, Text, Menu, MenuButton, MenuItem, MenuList, useColorModeValue } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { TbLanguage } from 'react-icons/tb'

function LanguageToggle () {
  const languages = {
    en: { nativeName: 'En', code: 'EN' },
    ar: { nativeName: 'Ar', code: 'AR' }
  }

  const { i18n } = useTranslation()
  const defaultStyle = {
    color: useColorModeValue('lightMode.primary', 'darkMode.primary'),
    fontWeight: 'normal'
  }
  const ActiveStyle = {
    color: useColorModeValue('gray.700', 'gray.300'),
    fontWeight: 'bold'
  }

  const menuItemBgColor = useColorModeValue('white', '#212121')
  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng)
    const rootElement = document.documentElement
    if (lng === 'ar') {
      rootElement.setAttribute('dir', 'rtl')
    } else {
      rootElement.setAttribute('dir', 'ltr')
    }
  }

  return (
      <Menu bgColor={useColorModeValue('white', '#212121')}>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<TbLanguage />}
          variant="outline"
          border="0px"
          fontSize="1.35rem"
          color={useColorModeValue('dark', 'light')}
        />
        <MenuList minW="60px" bgColor={useColorModeValue('white', '#212121')}>
          {Object.keys(languages).map((lng) => (
            <MenuItem
              bgColor={menuItemBgColor}
              key={lng}
              onClick={() => handleLanguageChange(lng)}
              color={
                i18n.resolvedLanguage === lng
                  ? defaultStyle.color
                  : ActiveStyle.color
              }
              fontWeight={
                i18n.resolvedLanguage === lng
                  ? ActiveStyle.fontWeight
                  : defaultStyle.fontWeight
              }
            >
              <Text>{languages[lng].nativeName}</Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
  )
}

export default LanguageToggle
