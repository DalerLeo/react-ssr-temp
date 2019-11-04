import { crossBrowserify, MAIN_COLOR } from 'constants/styles'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import MdFavorite from 'react-icons/lib/md/favorite'
import Spinner from 'icons/Spinner'

const withStyles = injectSheet({
  favBtn: {
    ...crossBrowserify('transition', 'all 200ms'),
    border: '1px solid #cbd0d8',
    borderRadius: '4px',
    color: '#656565',
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: '11px',
    marginLeft: '10px',
    padding: '8px',
    height: '36px',
    width: '36px',
    '&:hover:not($favBtnActive)': {
      borderColor: MAIN_COLOR,
      '& svg': {
        fill: MAIN_COLOR
      }
    },
    '& svg': {
      fontSize: '18px',
      fill: '#cbd0d8',
      display: 'block',
      transition: 'inherit'
    }
  },
  favBtnActive: {
    borderColor: '#EA4C89',
    '& svg': {
      fill: '#EA4C89'
    }
  }
})

const FavButton = props => {
  const { classes, onClick, isFav, loading } = props

  const onToggleFav = (event) => {
    event.preventDefault()
    if (loading) return null
    return onClick()
  }

  return (
    <div
      className={classNames(classes.favBtn, {
        [classes.favBtnActive]: isFav
      })} onClick={onToggleFav}
    >
      {loading ? <Spinner /> : <MdFavorite />}
    </div>
  )
}

FavButton.propTypes = {
  onClick: PropTypes.func,
  isFav: PropTypes.bool,
  loading: PropTypes.bool,
  classes: PropTypes.object
}

export default withStyles(FavButton)
