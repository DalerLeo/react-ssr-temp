import { crossBrowserify, PRIMARY_COLOR, WHITE_COLOR } from 'constants/styles'
import _ from 'lodash'
import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Menu from 'antd/lib/menu'
import { Field } from 'redux-form'
import { Checkbox, RadioGroup, Radio } from 'components/FormComponents'

const enhance = compose(
  injectSheet({
    menu: {
      ...crossBrowserify('boxShadow', '6px 6px 10px rgba(0, 0, 0, 0.03) !important'),
      border: 'none',
      padding: '10px 0',
      '& $item': {
        lineHeight: '40px',
        height: '40px',
        margin: '0 !important',
        padding: '0 15px'
      }
    },
    checkboxes: {
      '& $item:not(.ant-menu-horizontal).ant-menu-item-selected': {
        background: WHITE_COLOR
      }
    },
    radioMenu: {
      '& .ant-menu-item': {
        background: `${WHITE_COLOR} !important`,
        lineHeight: 'normal',
        height: 'auto',
        padding: '5px 15px',
        margin: '0'
      }
    },
    radio: {
      display: 'block',
      lineHeight: 'normal',
      marginBottom: '15px',
      marginRight: '0',
      '&:last-child': {
        marginBottom: '0'
      }
    },
    item: {
      '&:not(.ant-menu-horizontal).ant-menu-item-selected': {
        background: '#fafafa',
        color: PRIMARY_COLOR
      },
      '&.ant-menu-item-active': {
        background: WHITE_COLOR,
        color: PRIMARY_COLOR
      }
    },
    checkbox: {
      width: '100%'
    }
  })
)

/*
    Array example
    items = [
        {
            key: 'some_unique_key',
            label: 'Some label'
        }
    ]
*/

const DropdownOverlay = (props) => {
  const { classes, name, input, items, type, setVisible } = props
  if (type === 'radio') {
    return (
      <Menu className={classNames(classes.menu, classes.radioMenu)}>
        <Menu.Item key="radio">
          <Field
            name={name}
            component={RadioGroup}
            onChange={setVisible}
          >
            {_.map(items, item => {
              const value = _.get(item, 'key')
              const label = _.get(item, 'label')
              return (
                <Radio
                  key={value}
                  value={value}
                  label={label}
                  className={classes.radio}
                />
              )
            })}
          </Field>
        </Menu.Item>
      </Menu>
    )
  }
  return _.map(items, item => {
    const key = _.get(item, 'key')
    const label = _.get(item, 'label')
    if (type === 'checkbox') {
      return (
        <Field
          key={key}
          name={`${input.name}.${key}`}
          className={classes.checkbox}
          component={Checkbox}
          label={label}
        />
      )
    }
    return (
      <Menu.Item key={key} className={classes.item}>{label}</Menu.Item>
    )
  })
}

DropdownOverlay.propTypes = {
  items: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['default', 'checkbox', 'radio'])
}

DropdownOverlay.defaultProps = {
  type: 'default'
}

export default enhance(DropdownOverlay)
