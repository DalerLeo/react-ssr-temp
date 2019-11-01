import {
  crossBrowserify,
  fallbacksStyle,
  MAIN_COLOR,
  WHITE_COLOR
} from 'constants/styles'
import _ from 'lodash'
import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import AntCheckbox from 'antd/lib/checkbox'
import toBoolean from 'helpers/toBoolean'

const enhance = compose(
  injectSheet({
    checkboxWrapper: {
      '&:last-child:not(:first-child) $checkbox': {
        margin: '0'
      }
    },
    checkbox: {
      color: 'inherit',
      fontFamily: 'inherit',
      ...fallbacksStyle('display', 'inline-flex'),
      ...crossBrowserify('alignItems', 'center'),
      height: '22px',
      '& .ant-checkbox': {
        ...crossBrowserify('alignSelf', 'baseline'),
        fontFamily: 'inherit',
        top: 'unset'
      },
      '& .ant-checkbox-inner': {
        background: WHITE_COLOR,
        border: '1px #b4bfc9 solid'
      },
      // Focus
      '& .ant-checkbox-input:focus': {
        '& + .ant-checkbox-inner': {
          borderColor: MAIN_COLOR
        }
      },
      // Hover
      '&:hover': {
        '& .ant-checkbox-inner': {
          borderColor: MAIN_COLOR
        }
      },
      // CHECKED or INDETERMINATE
      '& .ant-checkbox-checked, & .ant-checkbox-indeterminate': {
        '& .ant-checkbox-inner': {
          borderColor: MAIN_COLOR,
          '&:after': {
            borderColor: MAIN_COLOR
          }
        },
        '&:after': {
          border: `1px ${MAIN_COLOR} solid`
        }
      },
      '& .ant-checkbox-indeterminate.ant-checkbox-checked': {
        '& .ant-checkbox-inner:after': {
          ...crossBrowserify('transform', 'scale(1)')
        }
      }
    }
  })
)

const checkedStyle = {
  color: MAIN_COLOR
}

const Checkbox = (defProps) => {
  const {
    input,
    children,
    className,
    wrapperClassName,
    classes,
    label,
    checked,
    onChange
  } = defProps

  return (
    <div className={classNames(classes.checkboxWrapper, wrapperClassName)}>
      <AntCheckbox
        {...defProps}
        className={classNames(classes.checkbox, className)}
        checked={checked || toBoolean(_.get(input, 'value'))}
        onChange={onChange || _.get(input, 'onChange')}
      >
        {children || <span style={_.get(input, 'value') ? checkedStyle : {}}>{label}</span>}
      </AntCheckbox>
    </div>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string
}

export default enhance(Checkbox)
