import { crossBrowserify } from 'constants/styles'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import withHistory from 'helpers/withHistory'
import MyJobLogos from 'images/MyJob_Logos_pure.svg'
import Link from '../Link'

const enhance = compose(
  withHistory,
  lifecycle({
    shouldComponentUpdate () {
      return false
    }
  }),
  injectSheet({
    logo: {
      ...crossBrowserify('transform', 'scale(0.85)'),
      backgroundImage: `url(${MyJobLogos})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '314px',
      display: 'inline-block',
      height: '38px',
      marginRight: '25px',
      minWidth: '147px',
      width: '147px'
    },
    logoSimple: {
      margin: '0'
    }
  })
)

const LogoTitle = props => {
  const { classes, simple, ...defaultProps } = props
  const backgroundPosition = typeof window === 'object' ? window.logoPosition : '-999px -999px'
  return (
    <Link
      to="/"
      {...defaultProps}
      style={{ backgroundPosition }}
      className={classNames(classes.logo, {
        [classes.logoSimple]: simple
      })}
    />
  )
}

LogoTitle.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  simple: PropTypes.bool
}

export default enhance(LogoTitle)
