import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue
} from '@chakra-ui/react'
import { useField } from 'formik'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

function InputField ({
  name,
  placeholder,
  value,
  label,
  type,
  InputElement,
  ...rest
}) {
  const [field, meta] = useField(name)
  const { i18n } = useTranslation()
  const isLTR = i18n.language === 'en'

  return (
      <FormControl {...rest} isInvalid={!!(meta.error && meta.touched)}>
        {label && <FormLabel>{label}</FormLabel>}
        <InputGroup>
          <Input
            placeholder={placeholder}
            backgroundColor={useColorModeValue(
              'lightMode.inputBackground',
              'darkMode.inputBackground'
            )}
            type={type}
            {...field}
            value={value}
          />
          {InputElement &&
            (isLTR
              ? (
              <InputLeftElement width="auto">{InputElement}</InputLeftElement>
                )
              : (
              <InputRightElement width="auto">{InputElement}</InputRightElement>
                ))}
        </InputGroup>
        {meta.error && meta.touched && (
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        )}
      </FormControl>
  )
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  InputElement: PropTypes.node
}

export default InputField
