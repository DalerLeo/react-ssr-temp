import {
  clone, pipe, assoc, prop, propEq, find, when, map,
  ifElse, prepend, not, propSatisfies, lt, filter
} from 'ramda'

  const ZERO = 0
// -------------------------------------------------
export const LANGUAGE = 'LANGUAGE'

export const PRODUCT_LIST = 'PRODUCT_LIST'
export const PRODUCT_ITEM = 'PRODUCT_ITEM'
export const PRODUCT_POPULAR = 'PRODUCT_POPULAR'
export const PRODUCT_SIMILAR = 'PRODUCT_SIMILAR'
export const PRODUCT_RECENT = 'PRODUCT_RECENT'
export const PRODUCT_CATEGORY = 'PRODUCT_CATEGORY'
export const PRODUCT_FAVORITE_SET = 'PRODUCT_FAVORITE_SET'
export const PRODUCT_FAVORITE = 'PRODUCT_FAVORITE'

export const CART_CHANGE_LIST = 'CART_CHANGE_LIST'

export const ASYNC_LOADING = 'ASYNC_LOADING'
export const ORDER_CREATE = 'ORDER_CREATE'
export const ORDER_LIST = 'ORDER_LIST'

export const MENU_LIST = 'MENU_LIST'

export const REGISTER = 'REGISTER'
export const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_NOT = 'SIGN_IN_NOT'

export const USER_DETAIL = 'USER_DETAIL'
export const USER_ADDRESS_LIST = 'USER_ADDRESS_LIST'
export const USER_ADDRESS_CREATE = 'USER_ADDRESS_CREATE'
export const USER_ADDRESS_DELETE = 'USER_ADDRESS_DELETE'

export const DELIVERY_TYPE_LIST = 'DELIVERY_TYPE_LIST'

export const PRODUCT_LIST_FILTER = 'PRODUCT_LIST_FILTER'

export const BANNER_LIST = 'BANNER_LIST'
export const FEEDBACK_LIST = 'FEEDBACK_LIST'
export const FEEDBACK_CREATE = 'FEEDBACK_CREATE'
export const CLIENTS = 'CLIENTS'
export const PARTNERS = 'PARTNERS'
export const SYSTEM_PAGES = 'SYSTEM_PAGES'
export const CART_ALERT = 'CART_ALERT'
export const SING_IN_ALERT = 'SING_IN_ALERT'
export const ORDER_ITEM_PAYMENT = 'ORDER_ITEM_PAYMENT'

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
      type: actionType.CART_CHANGE_LIST,
      payload: { data: formedList }
    })
  }
}

export const removeItemFrom = (id) => {
  const items = getCart()
  const formedList = filter(pipe(propEq('id', id), not))(items)
  removeFromCart(JSON.stringify(formedList))

  return {
    type: actionType.CART_CHANGE_LIST,
    payload: { data: formedList }
  }
}
