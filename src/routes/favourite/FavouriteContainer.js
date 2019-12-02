import * as STATE from 'constants/stateNames'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import equals from 'fast-deep-equal'
import { getDataFromState } from 'utils/get'
import { pathOr } from 'ramda'
import Favourite from './Favourite'
import { removeItemFrom } from './actions'

const FavouriteContainer = props => {
  const dispatch = useDispatch()
  const cartList = useSelector(getDataFromState(STATE.CART), equals)

  const onDelete = (id) => {
    return dispatch(removeItemFrom(id))
  }

  const products = pathOr([], ['data'], cartList)

  return <Favourite products={products} onDelete={onDelete} />
}

export default FavouriteContainer
