import { CART } from 'constants/storage'

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
