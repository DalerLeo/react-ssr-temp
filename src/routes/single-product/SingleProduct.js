import * as STATE from 'constants/stateNames'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { path, find, propEq, pathOr } from 'ramda'
import equals from 'fast-deep-equal'
import CartButton from 'components/UI/Button/CartButton'
import { getDataFromState } from 'utils/get'
import { setItemToCart } from 'components/Cards/storage'

const SingleProduct = (props) => {
  const { productData } = props

  const dispatch = useDispatch()

  const cartList = useSelector(getDataFromState(STATE.CART), equals)
  const datas = path(['data'], cartList)

  const data = path(['data'], productData)
  const name = path(['name'], data)
  const id = path(['id'], data)
  const filterProduct = find(propEq('id', id))(datas)
  const amount = pathOr(0, ['amount'], filterProduct)

  const onChange = value => {
    dispatch(setItemToCart(value, data))
  }
  console.warn(filterProduct)

  return (
    <div>
      {name} - {id} - <CartButton amount={amount} onChange={onChange} />
    </div>
  )
}

export default SingleProduct
