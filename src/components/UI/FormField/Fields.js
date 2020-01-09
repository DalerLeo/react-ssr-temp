import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

const Fields = props => {
  const {
    names,
    subscription,
    fieldsState = {},
    children,
    originalRender
  } = props

  if (!names.length) {
    return (originalRender || children)(fieldsState)
  }
  const [name, ...rest] = names
  return (
    <Field name={name} subscription={subscription}>
      {fieldState => (
        <Fields
          names={rest}
          subscription={subscription}
          originalRender={originalRender || children}
          fieldsState={{ ...fieldsState, [name]: fieldState }}
        />
      )}
    </Field>
  )
}
Fields.propTypes = {
  names: PropTypes.array,
  subscription: PropTypes.any,
  fieldsState: PropTypes.object,
  children: PropTypes.node,
  originalRender: PropTypes.any
}

export default Fields
