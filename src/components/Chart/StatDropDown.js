import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Arrow from 'icons/ChevDown'
import { fallbacksStyle, crossBrowserify } from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'

const enhance = compose(
  injectSheet({
    wrapper: {
      borderRadius: '12px',
      position: 'relative',
      '&:hover': {
        '& $menuItem': {
          opacity: '1',
          visibility: 'visible'
        }
      }
    },
    text: {
      ...fallbacksStyle('display', 'inline-flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('borderRadius', '50px'),
      background: hexToRgb('#EEF1F6', '0.7'),
      cursor: 'pointer',
      color: '#8798AD',
      fontSize: '13px',
      fontWeight: '500',
      lineHeight: '24px',
      padding: '0 12px',
      '& svg': {
        marginLeft: '5px'
      }
    },
    menuItem: {
      padding: '5px 0',
      zIndex: '100',
      whiteSpace: 'nowrap',
      transition: 'all 300ms',
      background: 'inherit',
      position: 'absolute',
      top: 'calc(100% + 3px)',
      opacity: '0',
      visibility: 'hidden',
      right: '0',
      boxShadow: '0 5px 12px 2px rgba(0, 0, 0, 0.04)',
      '& > div': {
        cursor: 'pointer',
        fontSize: '13px',
        lineHeight: '22px',
        padding: '3px 10px',
        transition: 'all 300ms',
        '&:hover': {
          background: '#efefef'
        }
      }
    }
  })
)
const DropDown = ({ classes, children, style, text, className }) => {
  return (
    <div style={style} className={classNames(classes.wrapper, className)}>
      <div className={classes.text}>
        <span>{text}</span>
        <Arrow/>
      </div>
      {React.cloneElement(
        children,
        { className: classNames(children.props.className, classes.menuItem) }
      )}
    </div>
  )
}
DropDown.propTypes = {
  classes: PropTypes.object,
  style: PropTypes.object,
  children: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string
}
export default enhance(DropDown)
