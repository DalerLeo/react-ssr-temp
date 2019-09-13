import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'

import { ANCHOR_DISABLED, MAIN_COLOR, NAV_BACKGROUND } from '../../constants/styles'
import PropTypes from 'prop-types'

/* eslint-disable standard/computed-property-even-spacing */
const enhance = compose(
  injectSheet({

    menuItem: {

    },
    menus: {
      whiteSpace: 'nowrap',
      transition: 'all 300ms',
      background: 'inherit',
      position: 'absolute',
      top: 'calc(100% + 3px)',
      opacity: '0',
      visibility: 'hidden',
      left: '0',
      lineHeight: 'normal',
      padding: '22px 24px 7px',
      fontSize: '15px',
      '& > a': {
        ...ANCHOR_DISABLED,
        display: 'block',
        marginBottom: '15px',
        cursor: 'pointer',
        transition: 'color 300ms',
        '&:hover': {
          color: MAIN_COLOR
        }
      }
    }
  })
)

const DropDown = ({ classes, children, text, className }) => {
  return (
    <div className={classes.dropWrapper}>
      <span>{text}</span>
      <div className={classes.menus}>
        {children}
      </div>
    </div>
  )
}
DropDown.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string
}
export default enhance(DropDown)
