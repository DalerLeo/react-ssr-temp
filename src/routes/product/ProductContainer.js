import * as STATE from 'constants/stateNames'
import React from 'react'
import useFetchList, { getListParams } from '../../hooks/useFetchList'
import Product from './Product'
import { getProduct, commentCreateAction, commentListFetch } from './actions'

const ProductContainer = ({ id, ...props }) => {
  const mapper = (history, params) => {
    return id
  }

  const productData = useFetchList({
    action: getProduct,
    stateName: STATE.PRODUCT_ITEM,
    mapper
  })

  const onComment = (values, commentId) => {
    const comment = path(['comment'], values)
    return dispatch(commentCreateAction(id, comment, commentId))
      .then(() => dispatch(commentListFetch(id, {  pageSize: '5'  })))
  }

  return <Product productData={productData} />
}

export default ProductContainer
