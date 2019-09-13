import fp from 'lodash/fp'
import { getCartItems, setItemToCart } from 'helpers/storage'
import toast from 'helpers/toast'
import * as actionTypes from 'constants/actionTypes'

const onAddCartItemToastProps = {
  title: 'Добавлено',
  message: 'Услуга добавлена в корзину'
}

const onRemoveCartItemToastProps = {
  title: 'Удалено',
  message: 'Услуга удалена из корзины'
}

const onClearCartToastProps = {
  title: 'Очищено',
  message: 'Ваша корзина очищена'
}

export const setItemsToCartAction = (item, amount, email) => {
  const serviceId = fp.get('id', item)
  const cartItems = getCartItems()

  const clonedObject = fp.flow(
    fp.clone,
    fp.assign({ amount })
  )(item)

  const existingService = fp.find({ id: serviceId }, fp.get(email, cartItems))
  const existingAmount = fp.get('amount', existingService)
  const existingServiceFormed = existingService
    ? fp.assign(existingService, { amount: existingAmount + amount })
    : null

  const formedArray = fp.flow(
    fp.get(email),
    fp.concat(clonedObject),
    fp.concat(existingServiceFormed),
    fp.uniqBy(fp.get('id')),
    fp.filter(obj => obj),
    fp.sortBy(fp.get('id'))
  )(cartItems)

  const formedData = { ...cartItems, [email]: formedArray }
  setItemToCart(formedData)
  toast(onAddCartItemToastProps)
  return dispatch => dispatch({
    type: actionTypes.CART_LIST,
    payload: Promise.resolve(formedData)
  })
}

export const setArrayToCartAction = (arrayOfServices, email) => {
  const cartData = getCartItems()
  const cartItems = fp.get(email, cartData)
  const mergedArray = fp.unionBy(cartItems, arrayOfServices, 'id')
  const formedArray = fp.flow(
    fp.uniqBy(fp.get('id')),
    fp.filter(obj => obj),
    fp.sortBy(fp.get('id'))
  )(mergedArray)
  const formedData = { ...cartData, [email]: formedArray }

  setItemToCart(formedData)
  toast(onAddCartItemToastProps)
  return dispatch => dispatch({
    type: actionTypes.CART_LIST,
    payload: Promise.resolve(formedData)
  })
}

export const removeCartItemAction = (id, email) => {
  const items = getCartItems()
  const formedData = {
    ...items,
    [email]: fp.flow(
      fp.get(email),
      fp.filter(item => fp.get('id', item) !== id)
    )(items)
  }
  setItemToCart(formedData)
  toast(onRemoveCartItemToastProps)
  return dispatch => dispatch({
    type: actionTypes.CART_LIST,
    payload: Promise.resolve(formedData)
  })
}

export const clearCartAction = (withToast = true, email) => {
  const formedData = { ...getCartItems(), [email]: [] }
  setItemToCart(formedData)
  if (withToast) toast(onClearCartToastProps)
  return dispatch => dispatch({
    type: actionTypes.CART_LIST,
    payload: Promise.resolve(formedData)
  })
}
