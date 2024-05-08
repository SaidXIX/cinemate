import { useColorModeValue } from '@chakra-ui/react'
function ExitIcon () {
  return (
        <>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 10L15 10M15 10L13 8M15 10L13 12M11 14L11 17C11 18.1046 10.1046 19 9 19L3 19C1.89543 19 1 18.1046 1 17L1 3C1 1.89543 1.89543 1 3 1L9 1C10.1046 1 11 1.89543 11 3L11 6" stroke={useColorModeValue('#1F1F22', '#FFFFFF')} strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
        </>
  )
}

export default ExitIcon
