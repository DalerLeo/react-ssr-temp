import * as actionTypes from 'constants/actionTypes'
import createReducer from 'utils/createReducer'

export const cartReducer = () => {
  return createReducer({}, {
    [`${actionTypes.CART_CHANGE_LIST}`] (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  })
}
