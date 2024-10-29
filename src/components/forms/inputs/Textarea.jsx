/* eslint-disable no-undef */
import { useRef, useEffect } from 'react'

import autosize from 'autosize'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  InputGroup,
  useColorModeValue
} from '@chakra-ui/react'
import { useField } from 'formik'
import PropTypes from 'prop-types'

function TextareaField ({
  onChange,
  value,
  name,
  placeholder,
  label,
  type,
  ...rest
}) {
  const [field, meta] = useField(name)
  const ref = useRef()
  useEffect(() => {
    autosize(ref.current)
    return () => {
      autosize.destroy(ref.current)
    }
  }, [])

  return (
      <FormControl isInvalid={!!(meta.error && meta.touched)}>
        {label && <FormLabel>{label}</FormLabel>}
        <InputGroup>
          <Textarea
            ref={ref}
            overflowY='scroll'
            style={{ resize: 'vertical', minHeight: '42px' }}
            maxHeight={{ base: '130px', md: '150px' }}
            transition="height none"
            placeholder={placeholder}
            backgroundColor={useColorModeValue(
              'lightMode.inputBackground',
              'darkMode.inputBackground'
            )}
            type={type}
            {...field}
            {...rest}
            value={value}
            onChange={onChange}
          />
        </InputGroup>
        {meta.error && meta.touched && (
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        )}
      </FormControl>
  )
}

TextareaField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  InputElement: PropTypes.node,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default TextareaField
