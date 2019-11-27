import * as STATE from 'constants/stateNames'
import React from 'react'
import { useSelector } from 'react-redux'
import equals from 'fast-deep-equal'
import { getDataFromState } from 'utils/get'
import { pathOr } from 'ramda'
import Home from './Home'

const HomeContainer = props => {
  const cartList = useSelector(getDataFromState(STATE.CART), equals)

  const products = pathOr([], ['data'], cartList)

  return <Home products={products} />
}

export default HomeContainer
