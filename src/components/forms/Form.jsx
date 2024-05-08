import { Formik } from 'formik'
import PropTypes from 'prop-types'

function Form ({
  initialValues,
  validationSchema,
  handleSubmit,
  children
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {formikProps => (
        <form onSubmit={formikProps.handleSubmit}>{children}</form>
      )}
    </Formik>
  )
}

Form.propTypes = {
  initialValues: PropTypes.object,
  validationSchema: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default Form
