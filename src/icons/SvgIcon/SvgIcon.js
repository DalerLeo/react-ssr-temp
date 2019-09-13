import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { crossBrowserify } from 'constants/styles'

const withStyles = injectSheet({
  icon: {
    ...crossBrowserify('transition', 'fill 300ms'),
    minWidth: '1em'
  }
})

const SvgIcon = ({ classes, className, children, ...props }) => {
  return (
    <svg
      className={classNames(classes.icon, className)}
      fill={'currentColor'}
      {...props}>
      {children}
    </svg>
  )
}

SvgIcon.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.any.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  fontSize: PropTypes.string,
  viewBox: PropTypes.string
}

SvgIcon.defaultProps = {
  fontSize: '24px',
  viewBox: '0 0 24 24',
  height: '1em',
  width: '1em',
  xmlns: 'http://www.w3.org/2000/svg'
}

export default withStyles(SvgIcon)
