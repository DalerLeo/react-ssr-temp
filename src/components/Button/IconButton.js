import {
  crossBrowserify,
  fallbacksStyle,
  MAIN_COLOR
} from 'constants/styles'
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { hexToRgb } from 'helpers'

const enhance = compose(
  injectSheet({
    iconButton: {
      ...fallbacksStyle('display', 'inline-flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'center'),
      ...crossBrowserify('transition', 'all 200ms'),
      border: `1px solid ${hexToRgb('#CBD0D8', '0.85')}`,
      borderRadius: '4px',
      cursor: 'pointer',
      height: '36px',
      width: '36px',
      '&:hover': {
        borderColor: MAIN_COLOR,
        '& $icon': {
          fill: MAIN_COLOR
        }
      }
    },
    icon: {
      fontSize: '18px',
      fill: '#CBD0D8',
      transition: 'inherit'
    }
  })
)

const FavButton = props => {
  const { classes, icon, className, onClick } = props

  return (
    <div className={classNames(classes.iconButton, className)} onClick={onClick}>
      {React.cloneElement(icon, {
        className: classes.icon
      })}
    </div>
  )
}

FavButton.propTypes = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  classes: PropTypes.object,
  className: PropTypes.string
}

export default enhance(FavButton)
