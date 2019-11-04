import {
  fallbacksStyle,
  crossBrowserify
} from 'constants/styles'
import fp from 'lodash/fp'
import loMap from 'lodash/map'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import T from 'components/T'

const enhance = compose(
  withState('isOpen', 'setIsOpen', false),
  injectSheet({
    dropdown: {

    },
    dropdownOpen: {
      '& $dropdownIcon > div': {
        background: 'transparent',
        border: '1px solid #7848B7'
      }
    },
    dropdownVertical: {
      '& $dropdownIcon': {
        display: 'block',
        '& > div': {
          display: 'block',
          '&:not(:last-child)': {
            marginRight: '0',
            marginBottom: '3px'
          }
        }
      }
    },
    dropdownTrigger: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'center'),
      cursor: 'pointer',
      position: 'absolute',
      right: '0',
      top: '0',
      height: '30px',
      width: '30px',
      zIndex: '5'
    },
    dropdownIcon: {
      display: 'inherit',
      '& > div': {
        ...crossBrowserify('transition', 'all 150ms'),
        background: '#A1A7B3',
        borderRadius: '50%',
        border: '1px solid transparent',
        display: 'inline-block',
        height: '4px',
        width: '4px',
        '&:not(:last-child)': {
          marginRight: '3px'
        }
      }
    },
    dropdownMenu: {
      ...crossBrowserify('boxShadow', '0px 14px 30px rgba(0, 0, 0, 0.14)'),
      padding: '10px 0'
    },
    dropdownMenuItem: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      color: '#8798ad',
      lineHeight: '18px',
      padding: '6px 22px',
      '& svg': {
        fontSize: '16px',
        marginRight: '8px'
      },
      '&:hover': {
        background: 'transparent',
        color: '#000'
      }
    }
  })
)

const CustomDropdown = props => {
  const { classes, className, actions, type, ...otherProps } = props

  const filterActions = fp.filter(item => item, actions)
  const dropdownMenu = (
    <Menu className={classes.dropdownMenu}>
      {loMap(filterActions, (item, index) => {
        const action = () => {
          item.action && item.action()
          otherProps.setIsOpen(false)
        }
        return (
          <Menu.Item key={index} className={classes.dropdownMenuItem} onClick={action}>
            {fp.get('icon', item)}
            <T>{fp.get('text', item)}</T>
          </Menu.Item>
        )
      })}
    </Menu>
  )

  return (
    <Dropdown
      overlay={dropdownMenu}
      trigger={['click']}
      placement="bottomRight"
      onVisibleChange={visible => otherProps.setIsOpen(visible)}
    >
      <div className={classNames(classes.dropdownTrigger, className, {
        [classes.dropdownOpen]: otherProps.isOpen,
        [classes.dropdownVertical]: type === 'vertical'
      })}
      >
        <div className={classes.dropdownIcon}>
          <div /><div /><div />
        </div>
      </div>
    </Dropdown>
  )
}

CustomDropdown.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  actions: PropTypes.array.isRequired,
  type: PropTypes.oneOf([
    'horizontal',
    'vertical'
  ])
}

CustomDropdown.defaultProps = {
  type: 'horizontal'
}

export default enhance(CustomDropdown)
