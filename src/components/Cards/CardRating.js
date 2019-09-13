import React from 'react'
import isNaN from 'lodash/isNaN'
import floor from 'lodash/floor'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import {
  fallbacksStyle,
  crossBrowserify,
  BLACK_COLOR
} from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'
import Favorite from 'icons/Popular'

const withStyles = injectSheet({
  rating: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    color: hexToRgb(BLACK_COLOR, '0.7'),
    fontSize: '13px',
    display: 'none',
    '& svg': {
      marginRight: '4px'
    }
  }
})

/* eslint-disable no-magic-numbers */
const CardRating = ({ classes, className, style, rating }) => {
  const ratingFloor = floor(rating, 1)
  const ratingNumber = isNaN(ratingFloor) ? 0 : ratingFloor
  return (
    <div className={classNames(classes.rating, className)} style={style}>
      <Favorite/>
      {`${ratingNumber}/5`}
    </div>
  )
}

CardRating.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  style: PropTypes.object,
  rating: PropTypes.number
}

export default withStyles(CardRating)
