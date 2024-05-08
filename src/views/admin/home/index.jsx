import { Flex, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'

import HomeMovieSection from './movie'
import HomeTvSection from './tvshow'

const HomeSection = () => {
  return (
    <Flex
      padding={2}
      overflowY='auto'
      flexDirection='column'
    >
      <Tabs variant='soft-rounded' colorScheme='blue'>
        <TabList justifyContent='center'>
          <Tab>Movies</Tab>
          <Tab>TV Shows</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HomeMovieSection />
          </TabPanel>
          <TabPanel>
            <HomeTvSection />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

export default HomeSection
