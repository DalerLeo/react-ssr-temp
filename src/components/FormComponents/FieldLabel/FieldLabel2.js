import { COLOR_RED, BLACK_COLOR } from 'constants/styles'
import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const enhance = compose(
  injectSheet({
    label: {
      color: BLACK_COLOR,
      fontSize: '15px',
      lineHeight: '1.47',
      marginBottom: '15px',
      fontWeight: '500',
      '& span': {
        color: '#fa2279'
      }
    },
    errorLabel: {
      color: COLOR_RED
    },
    required: {
      color: COLOR_RED
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
  classes: PropTypes.object,
  label: PropTypes.node,
  required: PropTypes.bool,
  error: PropTypes.bool
}

Label.defaultProps = {
  label: null,
  required: false,
  error: false
}

export default enhance(Label)
