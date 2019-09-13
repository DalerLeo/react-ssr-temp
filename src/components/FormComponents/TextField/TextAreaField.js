import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import {
  BORDER_COLOR,
  crossBrowserify,
  fallbacksStyle,
  FIELD_BORDER_STYLE,
  TEXT_COLOR_DEFAULT
} from 'constants/styles'
import classNames from 'classnames'
import Spinner from 'icons/Spinner'
import Label from 'components/FormComponents/FieldLabel/FieldLabel2'
import TextArea from 'antd/lib/input/TextArea'

const enhance = compose(
  injectSheet({
    inputWrapper: {
      position: 'relative'
    },
    loading: {
      position: 'absolute',
      bottom: '7px',
      right: '7px'
    },
    prefix: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'center'),
      position: 'absolute',
      top: '0',
      left: '15px',
      bottom: '0',
      '& > svg': {
        fontSize: '20px'
      }
    },
    inputField: {
      ...crossBrowserify('transition', 'all 300ms'),
      border: FIELD_BORDER_STYLE,
      borderRadius: '4px',
      color: TEXT_COLOR_DEFAULT,
      fontSize: '13px',
      padding: '5px 15px',
      outline: 'none',
      height: '32px',
      width: '100%'
    },
    textArea: {
      border: FIELD_BORDER_STYLE,
      borderRadius: '4px',
      boxShadow: 'none !important',
      color: TEXT_COLOR_DEFAULT,
      fontFamily: 'inherit',
      padding: '12px',
      resize: 'none',
      '&:hover, &:focus': {
        borderColor: BORDER_COLOR
      }
    },
    inputFieldPrefix: {
      paddingLeft: '50px'
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
    className,
    classes,
    label,
    prefix,
    disabled,
    loading,
    ...defaultProps
  } = props

  return (
    <div className={classes.wrapper}>
      <Label label={label}/>
      <div className={classes.inputWrapper}>
        {prefix && <div className={classes.prefix}>{prefix}</div>}
        <TextArea
          className={classNames(classes.textArea, className, {
            [classes.inputFieldPrefix]: prefix
          })}
          disabled={disabled || loading}
          {...defaultProps}
        />
        {loading && <div className={classes.loading}><Spinner/></div>}
      </div>
    </div>
  )
}

TextField.propTypes = {
  prefix: PropTypes.node,
  loading: PropTypes.bool,
  disabled: PropTypes.bool
}

TextField.defaultProps = {
  prefix: null
}

export default enhance(TextField)
