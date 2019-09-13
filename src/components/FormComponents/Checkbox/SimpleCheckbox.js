import _ from 'lodash'
import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import {
  BLACK_COLOR,
  crossBrowserify,
  fallbacksStyle,
  MAIN_COLOR,
  WHITE_COLOR
} from 'constants/styles'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import AntCheckbox from 'antd/lib/checkbox'
import toBoolean from 'helpers/toBoolean'

const enhance = compose(
  injectSheet(
    {
      checkbox: {
        color: BLACK_COLOR,
        fontFamily: '\'Montserrat\', sans-serif',
        ...fallbacksStyle('display', 'inline-flex'),
        ...crossBrowserify('alignItems', 'center'),
        height: '22px',
        '& .ant-checkbox': {
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
        }
      }
    }
  )
)

const checkedStyle = {
  color: MAIN_COLOR,
  fontWeight: '500'
}
const Checkbox = ({ ...defaultProps }) => {
  const { className, classes, label, checked, onChange } = defaultProps
  return (
    <div>
      <AntCheckbox
        {...defaultProps}
        className={classNames(classes.checkbox, className)}
        checked={checked}
        onChange={onChange}>
        <span style={checked ? checkedStyle : {}}>{label}</span>
      </AntCheckbox>
    </div>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string
}

export default enhance(Checkbox)
