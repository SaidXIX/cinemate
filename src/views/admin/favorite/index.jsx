import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Badge,
  HStack,
  Input,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Alert,
  ModalFooter,
  useDisclosure,
  AlertIcon,
  useToast
} from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { RiHeartAddFill } from 'react-icons/ri'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'

const FavoriteSection = () => {
  const [favorites, setFavorites] = useState([])
  const [filteredFavorites, setFilteredFavorites] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [modalOpenId, setModalOpenId] = useState(null)

  const { onClose } = useDisclosure()
  const toast = useToast()
  const handleOpenModal = (id) => {
    setModalOpenId(id)
  }

  const handleCloseModal = () => {
    setModalOpenId(null)
  }

  useEffect(() => {
    const favoritesData = JSON.parse(localStorage.getItem('Favorites')) || []
    setFavorites(favoritesData)
    setFilteredFavorites(favoritesData)
  }, [])

  const handleSearch = e => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    const filtered = favorites.filter(item =>
      item.name.toLowerCase().includes(term)
    )
    setFilteredFavorites(filtered)
  }

  const handleDeleteFavorite = (id) => {
    const updatedFavorites = favorites.filter(item => item.id !== id)
    setFavorites(updatedFavorites)
    setFilteredFavorites(updatedFavorites)
    localStorage.setItem('Favorites', JSON.stringify(updatedFavorites))
    onClose()
    toast({
      title: 'Item deleted',
      description: 'Favorite item has been succesfully removed',
      status: 'success',
      duration: 9000,
      isClosable: true
    })
  }

  return (
    <Flex flex={1} padding={2} overflowY='auto' flexDirection='column'>
      <HStack width='100%' justifyContent='space-between' alignItems='start'>
        <Input
          backgroundColor={useColorModeValue(
            'lightMode.inputBackground',
            'darkMode.inputBackground'
          )}
          value={searchTerm}
          onChange={handleSearch}
          placeholder='Search favorites...'
        />
        <Button
          leftIcon={<RiHeartAddFill />}
          as={Link}
          to='/'
          colorScheme='blue'
          fontSize='sm'
        >
          Add to favorites
        </Button>
      </HStack>
      <Grid
        templateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)'
        }}
        gap={6}
      >
        {filteredFavorites?.map(favorite => (
          <GridItem key={favorite.id}>
            <Box
              border='none'
              textAlign='center'
              borderWidth='1px'
              borderRadius='lg'
              p='4'
              _hover={{ cursor: 'pointer' }}
            >
              <Box
                padding={1}
                display='flex'
                flexDirection='column'
                backgroundRepeat='no-repeat'
                backgroundSize='cover'
                height='400px'
                width={{ base: '300px', md: '250px' }}
                backgroundImage={`https://image.tmdb.org/t/p/w500${favorite.image}`}
              >
                <HStack width='100%' justifyContent='space-between'>
                  <Menu>
                    <MenuButton
                      fontSize='xl'
                      colorScheme='blue'
                      variant='ghost'
                      alignSelf='flex-start'
                      as={IconButton}
                      icon={<BsThreeDotsVertical />}
                    />
                    <MenuList>
                      <MenuItem as={Button} leftIcon={<MdDelete />} onClick={() => handleOpenModal(favorite.id)}>
                        Delete from favorites
                      </MenuItem>
                      <Modal isOpen={modalOpenId === favorite.id} onClose={handleCloseModal}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Delete from favorites</ModalHeader>
                          <ModalBody>
                            <Text as={Alert} status='warning'> <AlertIcon />Are you sure you want to delete this from favorites?</Text>
                          </ModalBody>

                          <ModalFooter>
                            <Button variant='ghost' onClick={onClose} mr={3}>Cancel</Button>
                            <Button key={favorite.id} colorScheme='red' onClick={() => handleDeleteFavorite(favorite.id)}>
                              Delete
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </MenuList>
                  </Menu>
                  <Badge
                    colorScheme={favorite.type === 'tv' ? 'green' : 'blue'}
                  >
                    {favorite.type}
                  </Badge>
                </HStack>
              </Box>
              <Text fontWeight='bold' fontSize='md' mt='2'>
                {favorite.name}
              </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Flex>
  )
}

export default FavoriteSection
