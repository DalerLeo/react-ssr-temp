import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import axios, { getPayloadFromError, getPayloadFromSuccess } from 'utils/axios'

export const getProductCategoryList = (data) => {
  return (dispatch, getState) => {
    const params = {
      thumbnail_type: 'large',
      ...data,
      page_size: 12
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

export const filterListFetch = (data) => {
  return (dispatch, getState) => {
    const params = {
      thumbnail_type: 'large',
      ...data,
      page_size: 12
    }

    const payload = axios({ dispatch, getState })
      .get(API.FILTER_LIST, { params })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload: payload,
      type: actionTypes.FILTER_LIST
    })
  }
}
