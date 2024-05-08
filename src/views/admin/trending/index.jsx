import { useEffect, useRef, useState } from 'react'

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Text,
  Tooltip,
  Select,
  useDisclosure,
  VStack,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Badge
} from '@chakra-ui/react'
import { IoFilterSharp } from 'react-icons/io5'
import { MdFavorite, MdOutlineClear } from 'react-icons/md'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoMdBookmark } from 'react-icons/io'

import Pagination from '../shared/pagination'
import {
  handleAddToFavorites,
  handleAddToWatchlist,
  languages
} from '../shared/_constants'

const TrendingSection = () => {
  const [tvShows, setTvShows] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [error, setError] = useState(false)
  const [selectedTimeWindow, setSelectedTimeWindow] = useState('day')
  const [selectedLanguage, setSelectedLanguage] = useState('en-US')
  const [selectedMediaType, setSelectedMediaType] = useState('all')

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const toast = useToast()

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const token = import.meta.env.VITE_URL_TMDB_API_ACCESS_TOKEN
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/${selectedMediaType}/${selectedTimeWindow}?page=${currentPage}&language=${selectedLanguage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json'
            }
          }
        )
        const data = await response.json()
        setTvShows(data.results)
        setTotalPages(data.total_pages)
      } catch (error) {
        setError(true)
        console.error('Error fetching content:', error)
      }
    }

    fetchContent()
  }, [currentPage, selectedLanguage, selectedTimeWindow, selectedMediaType])

  const handleSelectedTimeWindow = event => {
    setSelectedTimeWindow(event.target.value)
    setCurrentPage(1)
  }

  const handleLanguageChange = event => {
    setSelectedLanguage(event.target.value)
    setCurrentPage(1)
  }

  const handleMediaTypeChange = event => {
    setSelectedMediaType(event.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = newPage => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleClearFilters = () => {
    setSelectedTimeWindow('day')
    setSelectedLanguage('en-US')
  }
  return (
    <Flex padding={2} overflowY='auto' flexDirection='column'>
      <VStack width='100%'>
        <HStack width='100%' justifyContent='end'>
          <Tooltip label='Filter'>
            <IconButton
              ref={btnRef}
              onClick={onOpen}
              aria-label='Filters'
              variant='outline'
              colorScheme='blue'
              icon={<IoFilterSharp size='20' />}
            />
          </Tooltip>
          <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader>Specify your search filters</DrawerHeader>

              <DrawerBody display='flex' flexDirection='column'>
                <Stack my={3}>
                  <Text>Choose the time window of the trending</Text>
                  <Select
                    value={selectedTimeWindow}
                    onChange={handleSelectedTimeWindow}
                  >
                    <option value='day'> Day </option>
                    <option value='week'> Week </option>
                  </Select>
                </Stack>
                <Stack my={3}>
                  <Text>Language</Text>
                  <Select
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                  >
                    {languages.map(language => (
                      <option key={language.value} value={language.value}>
                        {language.label}
                      </option>
                    ))}
                  </Select>
                </Stack>
                <Stack my={3}>
                  <Text>Media type</Text>
                  <Select
                    value={selectedMediaType}
                    onChange={handleMediaTypeChange}
                  >
                    <option value='all'> All </option>
                    <option value='tv'> Tv show </option>
                    <option value='movie'> Movie </option>
                  </Select>
                </Stack>
              </DrawerBody>

              <DrawerFooter>
                <Button variant='outline' mr={3} size='md' onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleClearFilters}
                  colorScheme='blue'
                  rightIcon={<MdOutlineClear />}
                >
                  Clear Filters
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </HStack>
        <Flex direction='column' flex='1'>
          {error
            ? <Box>Error occured, please try again later :( </Box>
            : <Grid
            templateColumns={{
              base: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            }}
            gap={6}
          >
            {tvShows?.map(show => (
              <GridItem key={show.id}>
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
                    backgroundImage={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
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
                          <MenuItem
                            onClick={() => {
                              handleAddToFavorites(show, show.media_type)
                              toast({
                                title: 'Item Added',
                                description:
                                  'Item has been added succesfuly to favorites',
                                status: 'success',
                                duration: 9000,
                                isClosable: true
                              })
                            }}
                            as={Button}
                            leftIcon={<MdFavorite />}
                          >
                            Add to favorites
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleAddToWatchlist(show, show.media_type)
                              toast({
                                title: 'Item Added',
                                description:
                                  'Item has been added succesfuly to favorites',
                                status: 'success',
                                duration: 9000,
                                isClosable: true
                              })
                            }}
                            as={Button}
                            leftIcon={<IoMdBookmark />}
                          >
                            Add to watchlist
                          </MenuItem>
                        </MenuList>
                      </Menu>
                      <Badge
                        colorScheme={
                          show.media_type === 'tv' ? 'green' : 'blue'
                        }
                      >
                        {show.media_type}
                      </Badge>
                    </HStack>
                  </Box>
                  <Text fontWeight='bold' fontSize='md' mt='2'>
                    {show.media_type === 'tv' ? show.name : show.title}
                  </Text>
                </Box>
              </GridItem>
            ))}
          </Grid>
}
        </Flex>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </VStack>
    </Flex>
  )
}

export default TrendingSection
