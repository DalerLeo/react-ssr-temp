import * as STATE from 'constants/stateNames'
import React from 'react'
import useFetchList, { getListParams } from '../../hooks/useFetchList'
import SingleProduct from './SingleProduct'
import { getProduct } from './actions'

const SingleProductContainer = ({ id, ...props }) => {
  const mapper = (history, params) => {
    return id
  }

  const productData = useFetchList({
    action: getProduct,
    stateName: STATE.PRODUCT_ITEM,
    mapper
  })

  return <SingleProduct productData={productData} />
}

export default SingleProductContainer
