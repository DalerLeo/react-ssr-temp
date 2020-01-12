import * as STATE from 'constants/stateNames'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import equals from 'fast-deep-equal'
import { getDataFromState } from 'utils/get'
import { pathOr } from 'ramda'
import Cart from './Cart'
import { removeItemFrom } from './actions'

const AddressContainer = props => {
  const dispatch = useDispatch()
  const cartList = useSelector(getDataFromState(STATE.CART), equals)

  const onDelete = (id) => {
    return dispatch(removeItemFrom(id))
  }

  const products = pathOr([], ['data'], cartList)

  const token = useSelector(getDataFromState('login'), equals)

  return <Cart products={products} onDelete={onDelete} token={token} />
}

export default AddressContainer
