import * as STATE from 'constants/stateNames'
import React from 'react'
import { path } from 'ramda'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import useFetchList from '../../hooks/useFetchList'
import Product from './components/Product'
import { getProduct, commentCreateAction, commentListFetch } from './actions'

const ProductContainer = props => {
  const { id } = props
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

  const onComment = (values, form, ...other) => {
    const comment = path(['comment'], values)
    return dispatch(commentCreateAction(id, comment))
      .then(() => form.change('comment', ''))
      .then(() => dispatch(commentListFetch(id, { pageSize: '5' })))
  }

  return <Product productData={productData} onSubmit={onComment} commentList={commentList} />
}

ProductContainer.propTypes = {
  id: PropTypes.number
}
export default ProductContainer
