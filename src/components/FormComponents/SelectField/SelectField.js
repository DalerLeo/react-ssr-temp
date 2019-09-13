import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import Select from 'antd/lib/select'
import { hexToRgb } from 'helpers/index'

const enhance = compose(
  injectSheet({
    wrapper: {
      marginBottom: '20px',
      '&:last-child': {
        marginBottom: '0'
      }
    },

    label: {
      color: hexToRgb('#616161', '0.85'),
      fontSize: '12px',
      fontStyle: 'italic',
      marginBottom: '5px'
    },

    select: {
      width: '200px',
      '& .ant-select-selection': {
        border: '1.5px #c2c2c2 solid',
        boxShadow: 'none !important',
        borderRadius: '50px'
      },
      '& .ant-select-selection__rendered': {
        margin: '0 15px'
      },
      '& .ant-select-arrow': {
        color: hexToRgb('#6e6e6e', '0.7'),
        fontWeight: '600'
      }
    },

    dropdown: {
      '& .ant-select-dropdown-menu-item-active': {
        background: '#efefef'
      }
    },

    fullWidth: {
      width: '100% !important'
    }
  })
)

const SelectField = ({ input, className, classes, withLabel, label, fullWidth, children, ...props }) => {
  return (
    <div className={classes.wrapper}>
      {withLabel && <div className={classes.label}>{label}</div>}
      <Select
        className={classNames(classes.select, className, {
          [classes.fullWidth]: fullWidth
        })}
        showSearch={true}
        dropdownClassName={classes.dropdown}
        notFoundContent={'Не найдено'}
        {...props}
        {...input}>
        {children}
      </Select>
    </div>
  )
}

SelectField.defaultProps = {
  withLabel: false
}

export default enhance(SelectField)
