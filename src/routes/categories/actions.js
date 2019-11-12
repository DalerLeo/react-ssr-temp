import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import axios, { getPayloadFromError, getPayloadFromSuccess } from 'utils/axios'

export const getProductCategoryList = (type) => {
  return (dispatch, getState) => {

    const params = {
      thumbnail_type: 'large',
      type
    }

    const payload = axios({ dispatch, getState })
      .get(API.PRODUCT_CATEGORY_LIST, { params })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload: payload,
      type: actionTypes.PRODUCT_CATEGORY_LIST
    })
  }
}
