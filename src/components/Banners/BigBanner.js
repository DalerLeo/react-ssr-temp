import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { crossBrowserify, fallbacksStyle } from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'

const enhance = compose(
  injectSheet({
    wrapper: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'center'),
      background: '#f5f5f5',
      color: hexToRgb('#000', '0.3'),
      fontSize: '26px',
      fontWeight: '600',
      height: '140px',
      marginTop: '50px'
    }
  })
)

const BigBanner = ({ className, classes }) => {
  return (
    <div className={classNames(classes.wrapper, className)}>
      Реклама
    </div>
  )
}

BigBanner.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object
}

export default enhance(BigBanner)
