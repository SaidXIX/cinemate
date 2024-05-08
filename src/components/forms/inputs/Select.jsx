import { FormControl, FormErrorMessage, FormLabel, Select, useColorModeValue } from '@chakra-ui/react'
import { useField } from 'formik'
import PropTypes from 'prop-types'

function SelectField ({ name, label, placeholder, options, ...rest }) {
  const [field, meta] = useField(name)

  return (
      <FormControl {...rest} isInvalid={ !!(meta.error && meta.touched) } >
        {label && <FormLabel>{label}</FormLabel>}
        <Select backgroundColor={useColorModeValue(
          'lightMode.inputBackground',
          'darkMode.inputBackground'
        )} placeholder={placeholder} {...field}>
        {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
        </Select>
        {meta.error && meta.touched && (<FormErrorMessage>{meta.error}</FormErrorMessage>)}
      </FormControl>
  )
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  label: PropTypes.string,
  InputElement: PropTypes.node
}

export default SelectField
