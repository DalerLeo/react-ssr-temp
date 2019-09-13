import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import classNames from 'classnames'
import injectSheet from 'react-jss'
import { MAIN_COLOR } from 'constants/styles'

const enhance = compose(
  injectSheet({
    button: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'inline-flex',
      justifyContent: 'center',
      marginRight: '15px',
      height: '20px',
      width: '20px',
      '& > svg': {
        fill: '#555',
        fontSize: '20px'
      }
    },
    active: {
      '& > svg': {
        fill: MAIN_COLOR,
        fontSize: '20px'
      }
    }
  })
)
const StyleButton = (props) => {
  const { classes, active, onToggle, style, label } = props

  const thisOnToggle = (event) => {
    event.preventDefault()
    return onToggle(style)
  }

  return (
    <span className={classNames(classes.button, {
      [classes.active]: active
    })} onMouseDown={thisOnToggle}>
      {label}
    </span>
  )
}

StyleButton.propTypes = {
  classes: PropTypes.object,
  active: PropTypes.bool,
  onToggle: PropTypes.func,
  style: PropTypes.any,
  label: PropTypes.any
}

export default enhance(StyleButton)
