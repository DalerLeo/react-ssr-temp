import * as STATE from 'constants/stateNames'
import React from 'react'
import { useSelector } from 'react-redux'
import equals from 'fast-deep-equal'
import { getDataFromState } from 'utils/get'
import { pathOr } from 'ramda'
import useFetchList from '../../hooks/useFetchList'
import Home from './Home'
import { getProductList } from './actions'

const HomeContainer = props => {
  const productData = useFetchList({
    action: getProductList,
    stateName: STATE.PRODUCT_LIST
  })

  return <Home productData={productData} />
}

export default HomeContainer
