/* eslint-disable react/prop-types */
import { Box, Button, Flex, Text } from '@chakra-ui/react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextClick = () => {
    onPageChange(currentPage + 1)
  }

  return (
    <Flex justify="center" align="center" mt="4">
      <Button
        size='sm'
        mr="2"
        onClick={handlePrevClick}
        disabled={isFirstPage}
        colorScheme="blue"
        variant="outline"
      >
        Previous
      </Button>
      <Box>
        <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
      </Box>
      <Button
        size='sm'
        ml="2"
        onClick={handleNextClick}
        disabled={isLastPage}
        colorScheme="blue"
        variant="outline"
      >
        Next
      </Button>
    </Flex>
  )
}

export default Pagination
