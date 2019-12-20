import { CART } from 'constants/storage'

export const getStorage = (local) => {
  if (typeof (window) !== 'undefined') {
    return local ? localStorage : sessionStorage
  }
  return { getItem: () => null, setItem: () => null }
}

export const setItemToCart = (items) => {
  if (typeof window === 'object') {
    localStorage.setItem(CART, JSON.stringify(items))
  }
}
export const getCartItems = () => {
  if (typeof window === 'object') {
    const items = localStorage.getItem(CART)
    return items ? JSON.parse(items) : {}
  }
  return null
}

export const getCart = () => {
  if (typeof (window) !== 'undefined') {
    return JSON.parse(localStorage.getItem(CART)) || []
  }
  return []
}

export const removeFromCart = (products, local = true) => {
  const storage = getStorage(local)
  storage.setItem(CART, products)
}
