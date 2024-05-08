/* eslint-disable react/no-unescaped-entities */
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, useColorModeValue } from '@chakra-ui/react'

const HelpSection = () => {
  return (
    <Flex padding={4} width='100%' flex={1} justifyContent='center' alignItems='center'>
      <Accordion backgroundColor={useColorModeValue('white', 'black')} allowToggle width={{ base: '100%', md: '60%' }}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                What is Cinemate?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Cinemate is a platform for tracking movies and TV shows. You can add your favorite movies and TV shows to your watchlist or favorites list, and keep track of what you've watched.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                How do I add a movie to my favorites?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            To add a movie to your favorites, simply navigate to the movie's page and click on the "Add to favorites" button.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                How do I track TV shows?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            You can track TV shows by searching for them in the search bar, then selecting "Add to watchlist" or "Add to favorites" from the options menu.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  )
}

export default HelpSection
