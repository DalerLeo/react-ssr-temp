import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import {
  BLACK_COLOR,
  crossBrowserify, fallbacksStyle,
  PRIMARY_COLOR,
  WHITE_COLOR
} from 'constants/styles'
import classNames from 'classnames'
import hexToRgb from 'helpers/hexToRgb'

const enhance = compose(
  injectSheet({
    signInWith: {
      color: hexToRgb(BLACK_COLOR, '0.6'),
      fontSize: '12px',
      textAlign: 'center',
      marginTop: '40px'
    },

    socials: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'center'),
      marginTop: '15px'
    },

    social: {
      ...crossBrowserify('transition', 'all 300ms ease'),
      background: PRIMARY_COLOR,
      borderRadius: '50%',
      cursor: 'pointer',
      height: '30px',
      width: '30px',
      padding: '7px',
      marginRight: '5px',
      '& > svg': {
        color: WHITE_COLOR,
        height: '16px !important',
        width: '16px !important'
      },
      '&:last-child': {
        marginRight: '0'
      },
      '&:hover': {
        background: hexToRgb(PRIMARY_COLOR, '0.9')
      }
    }
  })
)

const SocialLogin = ({ className, margin, classes, text, ...defaultProps }) => {
  return (
    <div style={{ margin }} className={classNames(classes.signInWith, className)}>
      <div>{text}</div>
      <div className={classes.socials}>
        <div className={classes.social}>

        </div>
        <div className={classes.social}>

        </div>
        <div className={classes.social}>

        </div>
        <div className={classes.social}>

        </div>
      </div>
    </div>
  )
}

SocialLogin.propTypes = {
  text: PropTypes.node.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  fullWidth: PropTypes.bool
}

export default enhance(SocialLogin)
