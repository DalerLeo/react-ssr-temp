import {
  crossBrowserify,
  MAIN_COLOR,
  TEXT_COLOR_DEFAULT,
  WHITE_COLOR
} from 'constants/styles'
import React from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import SearchFieldConfig from 'components/FormComponents/SearchFieldConfig'
import hexToRgb from 'helpers/hexToRgb'
import Label from './FieldLabel/FieldLabel2'

const style = {
  wrapper: {
    '& .ant-input': {
      fontSize: '15px',
      paddingLeft: '18px !important',
      color: MAIN_COLOR,
      border: 'none !important',
      borderRadius: '0',
      borderLeft: '1px solid #cbd0d8 !important'
    }
  },
  inputField: {
    borderRight: 'none',
    paddingLeft: '40px !important',
    background: WHITE_COLOR,
    '&:focus': {
      boxShadow: 'none'
    },
    '&::-ms-input-placeholder': {
      color: 'inherit'
    },
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
  inputFieldPrefix: {
    paddingLeft: '38px'
  },
  errorText: {
    paddingTop: '3px',
    fontSize: '13px',
    color: '#dc6b8a',
    left: '0'
  }
}
const PairedSearchField = props => {
  const {
    label,
    classes,
    prefix,
    searchWidth,
    type,
    input,
    className,
    errorText,
    meta: { error, touched, submitFailed },
    ...defaultProps
  } = props

  return (
    <div className={classNames(classes.wrapper)}>
      <Label label={label} />
      <div
        className={classNames({
          [classes.inputWrapper]: true
        })}
      >
        {prefix && <div className={classes.prefix}>{prefix}</div>}
        <input
          type={type}
          {...defaultProps}
          {...input}
          className={classNames({
            [className]: true,
            [classes.inputField]: true,
            [classes.inputFieldPrefix]: prefix
          })}
        />
      </div>
      <div className={classes.postfix}><SearchFieldConfig width={searchWidth} input={input} /></div>
      {(error || submitFailed) && touched && <span className={classes.errorText}>{error || errorText}</span>}
    </div>

  )
}

PairedSearchField.propTypes = {

}

export default injectSheet(style)(PairedSearchField)
