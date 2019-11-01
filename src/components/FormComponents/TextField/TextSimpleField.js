import {
  BORDER_COLOR,
  crossBrowserify,
  fallbacksStyle,
  FIELD_BORDER_STYLE,
  TEXT_COLOR_DEFAULT
} from 'constants/styles'
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import Label from 'components/FormComponents/FieldLabel'
import Label2 from 'components/FormComponents/FieldLabel/FieldLabel2'
import hexToRgb from '../../../helpers/hexToRgb'

const enhance = compose(
  injectSheet({
    inputWrapper: {
      width: '100%',
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
        fontSize: '20px',
        color: '#c6cbd4'
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
      fontSize: '15px',
      padding: '5px 15px',
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
      border: FIELD_BORDER_STYLE,
      borderRadius: 'unset',
      boxShadow: 'none !important',
      color: TEXT_COLOR_DEFAULT,
      fontFamily: 'inherit',
      '& .ant-input-number-input': {
        borderRadius: 'unset',
        color: TEXT_COLOR_DEFAULT,
        padding: '0 15px'
      },
      '& .ant-input-number-handler-wrap': {
        display: 'none'
      },
      '&:hover, &:focus': {
        borderColor: BORDER_COLOR
      }
    },
    inputFieldPrefix: {
      paddingLeft: '38px'
    },
    errorText: {
      paddingTop: '3px',
      fontSize: '13px',
      color: '#dc6b8a',
      left: '0'
    }
  })
)

const TextField = (props) => {
  const {
    input,
    className,
    classes,
    label,
    label2,
    prefix,
    type,
    width,
    big,
    overflow,
    wrapperClass,
    ...defaultProps
  } = props

  return (
    <div style={{ width }} className={classes.wrapper}>
      <Label label={label} />
      <Label2 label={label2} />
      <div
        className={classNames({
          [classes.inputWrapper]: true,
          [wrapperClass]: true,
          [classes.overflow]: overflow
        })}
      >
        {prefix && <div className={classes.prefix}>{prefix}</div>}
        <input
          type={type}
          {...input}
          {...defaultProps}
          className={classNames({
            [className]: true,
            [classes.inputField]: true,
            [classes.inputFieldPrefix]: prefix,
            [classes.bigInput]: big
          })}
        />

      </div>
    </div>
  )
}

TextField.propTypes = {
  prefix: PropTypes.node,
  overflow: PropTypes.bool,
  wrapperClass: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'password'])
}

TextField.defaultProps = {
  prefix: null,
  overflow: true
}

export default enhance(TextField)
