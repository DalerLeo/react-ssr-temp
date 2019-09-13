import React from 'react'
import { compose, withState } from 'recompose'
import injectSheet from 'react-jss'
import {
  crossBrowserify,
  fallbacksStyle,
  WHITE_COLOR,
  BLACK_COLOR
} from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'
import PropTypes from 'prop-types'

const enhance = compose(
  withState('openInformer', 'setOpenInformer', true),

  injectSheet({
    informer: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('justifyContent', 'center'),
      ...crossBrowserify('alignItems', 'center'),
      background: hexToRgb('#2282d6', '0.76'),
      color: WHITE_COLOR,
      fontSize: '12px',
      position: 'absolute',
      left: '0',
      right: '0',
      bottom: '0',
      height: '33px',
      zIndex: '1'
    },

    closeButton: {
      background: hexToRgb(BLACK_COLOR, '0.1'),
      color: 'inherit',
      cursor: 'pointer',
      lineHeight: '33px',
      padding: '0 20px',
      marginLeft: '15px'
    }
  })
)

const Informer = ({ classes, message, openInformer, setOpenInformer }) => {
  return openInformer
    ? <div className={classes.informer}>
      <div className={classes.text}>{message}</div>
      <div className={classes.closeButton} onClick={() => {
        setOpenInformer(false)
      }}>Закрыть</div>
    </div>
    : null
}

Informer.propTypes = {
  message: PropTypes.string.isRequired
}

export default enhance(Informer)
