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
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  useColorModeValue
} from '@chakra-ui/react'
import { IoFilterSharp } from 'react-icons/io5'
import { MdFavorite, MdOutlineClear } from 'react-icons/md'

import Pagination from '../shared/pagination'
import { languages, tvGenres, sortBy, handleAddToFavorites, handleAddToWatchlist } from '../shared/_constants'
import { IoMdBookmark } from 'react-icons/io'
import { BsThreeDotsVertical } from 'react-icons/bs'

const HomeTvSection = () => {
  const [tvShows, setTvShows] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [error, setError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('en-US')
  const [selectedSortBy, setSelectedSortBy] = useState('')
  const [releaseDate, setReleaseDate] = useState('')

  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const token = import.meta.env.VITE_URL_TMDB_API_ACCESS_TOKEN
        let url = `https://api.themoviedb.org/3/discover/tv?language=${selectedLanguage}&page=${currentPage}&with_genres=${selectedGenre}&sort_by=${selectedSortBy}&primary_release_date.gte=${releaseDate}`

        if (searchTerm.trim() !== '') {
          url = `https://api.themoviedb.org/3/search/tv?language=${selectedLanguage}&query=${searchTerm}`
        }

        const response = await fetch(
          url,
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
  }, [
    currentPage,
    releaseDate,
    selectedGenre,
    selectedLanguage,
    selectedSortBy,
    searchTerm
  ])

  const handlePageChange = newPage => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGenreChange = event => {
    setSelectedGenre(event.target.value)
    setCurrentPage(1)
  }

  const handleLanguageChange = event => {
    setSelectedLanguage(event.target.value)
    setCurrentPage(1)
  }

  const handleSortByChange = event => {
    setSelectedSortBy(event.target.value)
    setCurrentPage(1)
  }

  const handleReleaseDateChange = event => {
    setReleaseDate(event.target.value)
    setCurrentPage(1)
  }

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setReleaseDate('')
    setSelectedGenre('')
    setSelectedLanguage('')
    setSelectedSortBy('')
  }

  return (
    <VStack width='100%'>
      <HStack width='100%' justifyContent='end'>
      <Input onChange={handleSearchTermChange} value={searchTerm} placeholder='Search for a tv...' backgroundColor={useColorModeValue('lightMode.inputBackground', 'darkMode.inputBackground')}/>
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
                <Text>Release date</Text>
                <Input
                  value={releaseDate}
                  onChange={handleReleaseDateChange}
                  name='year'
                  type='date'
                />
              </Stack>
              <Stack my={3}>
                <Text>Genre</Text>
                <Select value={selectedGenre} onChange={handleGenreChange}>
                  <option value=''>All Genres</option>
                  {tvGenres.map(genre => (
                    <option key={genre.value} value={genre.value}>
                      {genre.label}
                    </option>
                  ))}
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
                <Text>Sort by</Text>
                <Select value={selectedSortBy} onChange={handleSortByChange}>
                  {sortBy.map(sort => (
                    <option key={sort.value} value={sort.value}>
                      {sort.label}
                    </option>
                  ))}
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
                  <Menu>
                    <MenuButton fontSize='xl' colorScheme='blue' variant='ghost' alignSelf='flex-start' as={IconButton} icon={<BsThreeDotsVertical/>}/>
                    <MenuList>
                    <MenuItem
                        onClick={() => {
                          handleAddToFavorites(show, 'tv')
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
                          handleAddToWatchlist(show, 'tv')
                          toast({
                            title: 'Item Added',
                            description:
                            'Item has been added succesfuly to the watchlist',
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
                </Box>
                <Text fontWeight='bold' fontSize='md' mt='2'>
                  {show.name}
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
  )
}

export default HomeTvSection
