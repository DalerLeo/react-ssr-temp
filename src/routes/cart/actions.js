import * as actionType from 'constants/actionTypes'
import {
  pipe, propEq, not, filter
} from 'ramda'
import { getCart, removeFromCart } from 'utils/storage'

export const removeItemFrom = (id) => {
  const items = getCart()
  const formedList = filter(pipe(propEq('id', id), not))(items)
  removeFromCart(JSON.stringify(formedList))

  return {
    type: actionType.CART_CHANGE_LIST,
    payload: { data: formedList }
  }
}
