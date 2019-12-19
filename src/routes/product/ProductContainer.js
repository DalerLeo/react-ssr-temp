import * as STATE from 'constants/stateNames'
import React from 'react'
import { path } from 'ramda'
import { useDispatch } from 'react-redux'
import useFetchList, { getListParams } from '../../hooks/useFetchList'
import Product from './Product'
import { getProduct, commentCreateAction, commentListFetch } from './actions'

const ProductContainer = ({ id, ...props }) => {
  const dispatch = useDispatch()

  const mapper = (history, params) => {
    return id
  }
  const commentList = useFetchList({
    action: commentListFetch,
    stateName: STATE.COMMENT_LIST,
    mapper
  })
  const productData = useFetchList({
    action: getProduct,
    stateName: STATE.PRODUCT_ITEM,
    mapper
  })

  const onComment = (values, commentId) => {
    const comment = path(['comment'], values)
    return dispatch(commentCreateAction(id, comment, commentId))
      .then(() => dispatch(commentListFetch(id, { pageSize: '5' })))
  }

  return <Product productData={productData} onSubmit={onComment} commentList={commentList} />
}

export default ProductContainer
