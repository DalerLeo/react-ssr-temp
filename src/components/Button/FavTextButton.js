import React, { useState } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { fallbacksStyle, crossBrowserify } from 'constants/styles'
import Spinner from 'icons/Spinner'
import { Button, WHITE } from './index'
import Fav from 'icons/Favorite'
import T from 'components/T'

const withStyles = injectSheet({
  favButton: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center')
  },
  favIcon: {
    color: '#CBD0D8',
    marginRight: '5px'
  },
  loader: {
    fontSize: '16px',
    marginRight: '5px'
  },
  favIconActive: {
    color: '#EA4C89'
  }
})

const FavTextButton = props => {
  const { isFavorite, onAdd, id, onRemove, onSuccess, classes, onClick } = props
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    if (typeof onClick === 'function') return onClick()

    setLoading(true)
    if (isFavorite) {
      return onRemove(id)
        .then(() => onSuccess(false))
        .then(() => setLoading(false))
        .catch(() => setLoading(false))
    }
    return onAdd(id)
      .then(() => onSuccess(true))
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }

  return (
    <Button
      type={'small'}
      color={WHITE}
      className={classes.favButton}
      onClick={handleClick}
      bordered={true}>
      {loading
        ? <Spinner className={classes.loader}/>
        : <Fav className={classNames({
          [classes.favIcon]: true,
          [classes.favIconActive]: isFavorite
        })}/>}
      <T>{isFavorite ? 'button_remove_favorite' : 'button_add_favorite'}</T>
    </Button>
  )
}

FavTextButton.propTypes = {
  classes: PropTypes.object,
  onSuccess: PropTypes.func,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onClick: PropTypes.func,
  isFavorite: PropTypes.bool,
  id: PropTypes.number
}

export default withStyles(FavTextButton)

