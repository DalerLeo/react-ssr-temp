import { crossBrowserify, MAIN_COLOR } from 'constants/styles'
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'

const enhance = compose(
  injectSheet({
    tooltipWrap: {
      display: 'inline-block',
      position: 'relative',
      '& $toolTip': {
        ...crossBrowserify('transition', 'all 300ms')
      },
      '&:hover': {
        '& $toolTip': {
          opacity: '1',
          visibility: 'visible'
        }
      }
    },
    toolTip: {
      ...crossBrowserify('transform', 'translateY(-50%)'),
      background: MAIN_COLOR,
      borderRadius: '4px',
      color: '#fff',
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '20px',
      opacity: '0',
      padding: '0 8px',
      position: 'absolute',
      top: '50%',
      left: 'calc(100% + 8px)',
      textIndent: '0',
      visibility: 'hidden',
      whiteSpace: 'nowrap',
      zIndex: '1',
      '&:after': {
        ...crossBrowserify('transform', 'translateY(-50%)'),
        borderWidth: '5px',
        borderStyle: 'solid',
        borderColor: `transparent ${MAIN_COLOR} transparent transparent`,
        content: '" "',
        position: 'absolute',
        right: '100%',
        top: '50%'
      }
    }
  })
)

const ToolTip = ({ className, children, classes, text }) => {
  return (
    <div className={classNames(classes.tooltipWrap, className)}>
      {children}
      <div className={classes.toolTip}>{text}</div>
    </div>
  )
}

ToolTip.propTypes = {
  text: PropTypes.node.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  classes: PropTypes.object,
  children: PropTypes.any,
  fullWidth: PropTypes.bool
}

export default enhance(ToolTip)
