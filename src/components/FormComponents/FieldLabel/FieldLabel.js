import { COLOR_RED } from 'constants/styles'
import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const enhance = compose(
  injectSheet({
    errorLabel: {
      color: COLOR_RED
    },
    label: {
      whiteSpace: 'nowrap',
      fontWeight: '600',
      marginBottom: '15px',
      '& span': {
        color: '#fa2279'
      }
    }
  })
)

const Label = ({ ...props }) => {
  const { classes, label, required, error } = props
  if (label) {
    return (
      <div className={classNames(classes.label, { [classes.errorLabel]: error })}>
        {label}
        {required && <span> *</span>}
      </div>
    )
  }
  return null
}

Label.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  classes: PropTypes.object,
  error: PropTypes.bool
}

Label.defaultProps = {
  label: null,
  required: false,
  error: false
}

export default enhance(Label)
