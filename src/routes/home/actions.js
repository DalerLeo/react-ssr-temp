import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import axios, { getPayloadFromError, getPayloadFromSuccess } from 'utils/axios'

export const getProductList = () => {
  return (dispatch, getState) => {
    const params = {
    }

    const payload = axios({ dispatch, getState })
      .get(API.PRODUCT_LIST, { params })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload: payload,
      type: actionTypes.PRODUCT_LIST
    })
  }
}
