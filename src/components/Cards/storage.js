import * as actionTypes from 'constants/actionTypes'
import {
  clone, pipe, assoc, prop, propEq, find, when, map,
  ifElse, prepend, not, propSatisfies, lt, filter
} from 'ramda'

const ZERO = 0
// -------------------------------------------------

// -------------------------------------------------
export const CART = 'cart'
export const TOKEN = 'token'
export const LANG = 'lang'
export const API_TOM = 'api_tom'
export const PAGE_SIZE = 'page_size'
// --------------------------------------------------
export const getStorage = (local) => {
  if (typeof (window) !== 'undefined') {
    return local ? localStorage : sessionStorage
  }
  return { getItem: () => null, setItem: () => null }
}

export const getCart = () => {
  if (typeof (window) !== 'undefined') {
    return JSON.parse(localStorage.getItem(CART)) || []
  }
  return []
}

export const setToCart = (products, local = true) => {
  const storage = getStorage(local)
  storage.setItem(CART, products)
}

export const removeFromCart = (products, local = true) => {
  const storage = getStorage(local)
  storage.setItem(CART, products)
}

export const setLang = (lang, local = true) => {
  const storage = getStorage(local)
  storage.setItem(LANG, lang)
}
export const getLang = (local = true) => {
  const storage = getStorage(local)
  return storage.getItem(LANG)
}

export const getApi = (local = true) => {
  const storage = getStorage(local)
  return storage.getItem(API_TOM)
}

// --------------------------------------------------
export const setItemToCart = (amount, product) => {
  const items = getCart()
  const id = prop('id', product)
  const alter = map(
    when(
      propEq('id', id),
      assoc('amount', amount)
    ),
  )
  const clonedObj = pipe(
    clone,
    assoc('amount', amount)
  )(product)

  const formedList = pipe(
    ifElse(
      pipe(find(propEq('id', id)), not),
      prepend(clonedObj),
      alter
    ),
    filter(
      propSatisfies(lt(ZERO), 'amount'),
    ))(items)

  setToCart(JSON.stringify(formedList))

  return (dispatch, getState) => {
    dispatch({
      type: 'CART_ALERT',
      payload: { product, amount, open: true }
    })
    return dispatch({
      type: actionTypes.CART_CHANGE_LIST,
      payload: { data: formedList }
    })
  }
}

export const removeItemFrom = (id) => {
  const items = getCart()
  const formedList = filter(pipe(propEq('id', id), not))(items)
  removeFromCart(JSON.stringify(formedList))

  return {
    type: actionTypes.CART_CHANGE_LIST,
    payload: { data: formedList }
  }
}
