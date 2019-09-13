import fp from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import {
  COLOR_RED,
  crossBrowserify,
  fallbacksStyle,
  FIELD_BORDER_STYLE,
  TEXT_COLOR_DEFAULT
} from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'
import { normalizeNumber } from 'helpers/normalizeNumber'
import Visibility from 'react-icons/lib/md/visibility'
import VisibilityOff from 'react-icons/lib/md/visibility-off'
import Label from 'components/FormComponents/FieldLabel'
import Label2 from 'components/FormComponents/FieldLabel/FieldLabel2'
import InputNumber from 'antd/lib/input-number'

const enhance = compose(
  injectSheet({
    wrapper: {
      position: 'relative'
    },
    inputWrapper: {
      border: FIELD_BORDER_STYLE,
      borderRadius: '4px',
      background: '#fff',
      position: 'relative',
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'center')
    },
    overflow: {
      overflow: 'hidden'
    },
    prefix: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'center'),
      position: 'absolute',
      top: '0',
      left: '17px',
      bottom: '0',
      '& > svg': {
        fontSize: '20px'
      }
    },
    postfix: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'center'),
      '& > svg': {
        fontSize: '20px'
      }
    },
    inputField: {
      border: 'none',
      borderRadius: '4px',
      height: '43px',
      ...crossBrowserify('transition', 'all 300ms'),
      color: TEXT_COLOR_DEFAULT,
      fontSize: '14px',
      padding: '5px 12px',
      outline: 'none',
      width: '100%',
      '&::placeholder': {
        color: hexToRgb('#a1a7b3', '0.8')
      }
    },
    bigInput: {
      height: '53px'
    },
    inputNumber: {
      border: 'none',
      borderRadius: 'unset',
      boxShadow: 'none !important',
      color: TEXT_COLOR_DEFAULT,
      fontFamily: 'inherit',
      height: '43px',
      width: '100%',
      '& > div': {
        height: '100%'
      },
      '& .ant-input-number-input': {
        borderRadius: 'unset',
        color: TEXT_COLOR_DEFAULT,
        height: '100%',
        padding: '5px 12px'
      },
      '& .ant-input-number-handler-wrap': {
        display: 'none'
      }
    },
    inputFieldPrefix: {
      paddingLeft: '38px'
    },
    inputTextPrefix: {
      order: '2',
      '& + $prefix': {
        ...crossBrowserify('alignSelf', 'normal'),
        background: '#eef1f6',
        borderRight: FIELD_BORDER_STYLE,
        fontSize: '13px',
        padding: '0 10px',
        position: 'unset',
        order: '1'
      }
    },
    errorText: {
      color: COLOR_RED,
      display: 'block',
      fontSize: '13px',
      marginTop: '2px'
    },
    errorBorder: {
      borderColor: COLOR_RED
    },
    inputDisabled: {
      pointerEvents: 'none',
      opacity: '0.3'
    },

    passwordInput: {
      position: 'relative',
      width: '100%'
    },
    showPass: {
      ...crossBrowserify('transform', 'translateY(-50%)'),
      cursor: 'pointer',
      position: 'absolute',
      top: '50%',
      right: '15px',
      '& > svg': {
        color: '#8a8a8a',
        display: 'block',
        fontSize: '22px'
      }
    }
  })
)

/* eslint-disable react/prop-types */
const TextField = (props) => {
  const {
    input,
    className,
    classes,
    label,
    label2,
    prefix,
    postfix,
    type,
    required,
    width,
    big,
    overflow,
    wrapperClass,
    meta,
    disabled,
    showPassword,
    ...defaultProps
  } = props

  const [showPass, setShowPass] = React.useState(false)

  const error = fp.get('error', meta)
  const touched = fp.get('touched', meta)
  const submitFailed = fp.get('submitFailed', meta)

  const isError = (touched || submitFailed) && Boolean(error)
  const isTextPrefix = fp.isString(prefix)

  const getFieldByType = () => {
    switch (type) {
      case 'number': return (
        <InputNumber
          {...defaultProps}
          onChange={input.onChange}
          value={input.value}
          formatter={normalizeNumber}
          className={classNames(classes.inputNumber, className, {
            [classes.inputFieldPrefix]: prefix && !isTextPrefix,
            [classes.inputTextPrefix]: isTextPrefix
          })}
        />
      )
      case 'password': return (
        <div className={classes.passwordInput}>
          <input
            type={showPass ? 'text' : 'password'}
            {...defaultProps}
            {...input}
            className={classNames(className, classes.inputField)}
          />
          {showPassword && (
            <div className={classes.showPass} onClick={() => setShowPass(!showPass)}>
              {showPass ? <VisibilityOff/> : <Visibility/>}
            </div>
          )}
        </div>
      )
      default: return (
        <input
          type={type}
          {...defaultProps}
          {...input}
          className={classNames(className, {
            [classes.inputField]: true,
            [classes.inputFieldPrefix]: prefix,
            [classes.bigInput]: big
          })}
        />
      )
    }
  }
  return (
    <div className={classes.wrapper}>
      <Label error={isError} required={required} label={label}/>
      <Label2 error={isError} label={label2}/>
      <div
        style={{ width }}
        className={classNames({
          [classes.inputWrapper]: true,
          [wrapperClass]: true,
          [classes.inputDisabled]: disabled,
          [classes.overflow]: overflow,
          [classes.errorBorder]: isError
        })}>
        {getFieldByType()}
        {prefix && <div className={classes.prefix}>{prefix}</div>}
        {postfix && <div className={classes.postfix}>{postfix}</div>}

      </div>
      {isError && <span style={{ width }} className={classes.errorText}>{error}</span>}
    </div>
  )
}

TextField.propTypes = {
  prefix: PropTypes.node,
  overflow: PropTypes.bool,
  disabled: PropTypes.bool,
  showPassword: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'number', 'password'])
}

TextField.defaultProps = {
  prefix: null,
  overflow: true
}

export default enhance(TextField)
