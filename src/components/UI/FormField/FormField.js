import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Input/Input'

const FormField = props => {
  const { label, input, ...rest } = props
  return (
    <Input label={label} {...rest} {...input} />
  )
}

FormField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object
}
export default FormField
