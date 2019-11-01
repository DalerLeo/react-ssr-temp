import { crossBrowserify } from 'constants/styles'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

const withStyles = injectSheet({
  badge: {
    ...crossBrowserify('animation', 'pulses 700ms infinite'),
    background: 'white',
    borderRadius: '50%',
    border: '3px solid #f46090',
    position: 'absolute',
    width: '13px',
    height: '13px'
  },
  '@keyframes pulses': {
    '0%': crossBrowserify('boxShadow', '0 0 0 0px rgba(244, 96, 144, 0.7)'),
    '100%': crossBrowserify('boxShadow', '0 0 0 10px rgba(244, 96, 144, 0)')
  }
})

const BadgePulse = props => {
  const { classes, positions } = props
  return <div className={classes.badge} style={{ ...positions }} />
}

BadgePulse.propTypes = {
  classes: PropTypes.object,
  positions: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number
  })
}

export default withStyles(BadgePulse)
