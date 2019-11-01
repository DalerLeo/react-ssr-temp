import {
  crossBrowserify,
  WHITE_COLOR,
  BUTTON_GREY_COLOR,
  YELLOW_COLOR,
  BLACK_COLOR,
  MAIN_COLOR
} from 'constants/styles'
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import hexToRgb from 'helpers/hexToRgb'
import Spinner from 'icons/Spinner'
import T from 'components/T'
import {
  YELLOW,
  GREY,
  WHITE,
  TRANSPARENT,
  APPEAL,
  REGRET,
  COLD,
  REGRET_BORDERED
} from './index'

const enhance = compose(
  injectSheet({
    button: {
      ...crossBrowserify('transition', 'all 400ms ease'),
      position: 'relative',
      background: MAIN_COLOR,
      color: WHITE_COLOR,
      cursor: 'pointer',
      border: '1px solid transparent',
      fontWeight: '500',
      borderRadius: '4px',
      fontSize: '14px',
      outline: 'none',
      padding: '0 22px',
      height: '34px',
      zIndex: '3',
      '&:hover': {
        background: hexToRgb(MAIN_COLOR, '0.8')
      },
      '&:disabled': {
        pointerEvents: 'none !important',
        opacity: '0.5 !important'
      }
    },

    medium: {
      fontSize: '14px',
      height: '45px'
    },

    large: {
      fontSize: '15px',
      padding: '0 32px',
      height: '48px'
    },

    small: {
      fontWeight: '400',
      fontSize: '13px',
      padding: '0 15px',
      height: '36px'
    },
    xs: {
      fontSize: '11px',
      padding: '0 24px',
      height: '27px'
    },
    fullWidth: {
      width: '100%'
    },
    alternate: {
      backgroundColor: 'transparent',
      color: MAIN_COLOR,
      '&:hover, &:active': {
        background: 'unset',
        color: hexToRgb(MAIN_COLOR, '0.8')
      }
    },
    grey: {
      backgroundColor: BUTTON_GREY_COLOR,
      color: BLACK_COLOR,
      '&:hover': {
        background: '#ececec'
      }
    },
    white: {
      background: '#fff',
      color: '#000',
      '&:hover': {
        background: hexToRgb('#efefef', '0.3')
      }
    },
    yellow: {
      background: YELLOW_COLOR,
      color: BLACK_COLOR,
      '&:hover': {
        background: hexToRgb(YELLOW_COLOR, '0.7')
      }
    },
    cold: {
      background: '#EEF1F6',
      border: '1px solid #DADDE3',
      color: '#000',
      '&:hover': {
        background: hexToRgb('#EEF1F6', '0.7')
      }
    },
    appeal: {
      background: '#7560F4',
      '&:hover': {
        background: hexToRgb('#7560F4', '0.8')
      }
    },
    regret: {
      background: '#F46090',
      '&:hover': {
        background: hexToRgb('#F46090', '0.8')
      }
    },
    regretBordered: {
      color: '#F46090',
      background: '#fff',
      border: '1px solid #F46090',
      '&:hover': {
        background: hexToRgb('#efefef', '0.3')
      }
    },
    transparent: {
      borderColor: BLACK_COLOR,
      background: 'transparent',
      color: BLACK_COLOR,
      '&:hover': {
        background: hexToRgb('#efefef', '0.2')
      }
    },
    rounded: {
      borderRadius: '18px'
    },

    bordered: {
      border: '1px solid #cbd0d8',
      background: 'transparent'
    },
    loading: {
      opacity: '0.3',
      pointerEvents: 'none'
    },
    loader: {
      fontSize: '18px',
      marginLeft: '6px',
      verticalAlign: 'text-bottom'
    }
  })
)

const Button = props => {
  const {
    className,
    classes,
    text,
    type,
    alternate,
    light,
    fullWidth,
    children,
    style,
    color,
    bordered,
    loading,
    rounded,
    submitType,
    disabled,
    ...defaultProps
  } = props

  const textIsString = typeof text === 'string'

  return (
    <button
      disabled={disabled || loading}
      className={classNames(classes.button, className, {
        [classes.loading]: loading,
        [classes.small]: type === 'small',
        [classes.medium]: type === 'medium',
        [classes.large]: type === 'large',
        [classes.xs]: type === 'xs',
        [classes.fullWidth]: fullWidth,
        [classes.alternate]: alternate,
        [classes.light]: light,
        [classes.rounded]: rounded,
        [classes.grey]: color === GREY,
        [classes.yellow]: color === YELLOW,
        [classes.transparent]: color === TRANSPARENT,
        [classes.bordered]: bordered,
        [classes.white]: color === WHITE,
        [classes.cold]: color === COLD,
        [classes.regret]: color === REGRET,
        [classes.regretBordered]: color === REGRET_BORDERED,
        [classes.appeal]: color === APPEAL
      })}
      type={submitType}
      style={style}
      {...defaultProps}
    >
      {textIsString ? <T>{text}</T> : text || children}
      {loading && <Spinner className={classes.loader} />}
    </button>
  )
}

Button.propTypes = {
  classes: PropTypes.object,
  alternate: PropTypes.bool,
  children: PropTypes.node,
  text: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf([
    'small',
    'medium',
    'large',
    'xs'
  ]),
  style: PropTypes.object,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  bordered: PropTypes.bool,
  light: PropTypes.bool,
  rounded: PropTypes.bool,
  submitType: PropTypes.string
}

Button.defaultProps = {
  submitType: 'button'
}

export default enhance(Button)
