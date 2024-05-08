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
  useToast,
  AlertIcon
} from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdBookmarkAdd, MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'

const WatchlistSection = () => {
  const [watchlist, setWatchlist] = useState([])
  const [filteredWatchlist, setFilteredWatchlist] = useState([])
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
    const watchlistData = JSON.parse(localStorage.getItem('Watchlist')) || []
    setWatchlist(watchlistData)
    setFilteredWatchlist(watchlistData)
  }, [])

  const handleSearch = e => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    const filtered = watchlist.filter(item =>
      item.name.toLowerCase().includes(term)
    )
    setFilteredWatchlist(filtered)
  }

  const handleDeleteWatchlistItem = (id) => {
    const updatedWatchlist = watchlist.filter(item => item.id !== id)
    setWatchlist(updatedWatchlist)
    setFilteredWatchlist(updatedWatchlist)
    localStorage.setItem('Watchlist', JSON.stringify(updatedWatchlist))
    onClose()
    toast({
      title: 'Item deleted',
      description: 'Watchlist item has been successfully removed',
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
          placeholder='Search watchlist...'
        />
        <Button
          leftIcon={<MdBookmarkAdd/>}
          as={Link}
          to='/'
          colorScheme='blue'
          fontSize='sm'
        >
          Add to watchlist
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
        {filteredWatchlist.map(item => (
          <GridItem key={item.id}>
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
                backgroundImage={`https://image.tmdb.org/t/p/w500${item.image}`}
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
                      <MenuItem as={Button} leftIcon={<MdDelete />} onClick={() => handleOpenModal(item.id)}>
                        Delete from watchlist
                      </MenuItem>
                      <Modal isOpen={modalOpenId === item.id} onClose={handleCloseModal}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Delete from watchlist</ModalHeader>
                          <ModalBody>
                            <Text as={Alert} status='warning'> <AlertIcon />Are you sure you want to delete this from watchlist?</Text>
                          </ModalBody>

                          <ModalFooter>
                            <Button variant='ghost' onClick={onClose} mr={3}>Cancel</Button>
                            <Button colorScheme='red' onClick={() => handleDeleteWatchlistItem(item.id)}>
                              Delete
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </MenuList>
                  </Menu>
                  <Badge colorScheme={item.type === 'tv' ? 'green' : 'blue'}>
                    {item.type}
                  </Badge>
                </HStack>
              </Box>
              <Text fontWeight='bold' fontSize='md' mt='2'>
                {item.name}
              </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Flex>
  )
}

export default WatchlistSection
