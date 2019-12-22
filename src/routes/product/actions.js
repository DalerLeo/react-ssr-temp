import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import axios, { getPayloadFromError, getPayloadFromSuccess } from 'utils/axios'
import { sprintf } from 'sprintf-js'
import { path } from 'ramda'

export const getProduct = (id) => {
  return (dispatch, getState) => {
    const params = {
      thumbnail_type: 'large'
    }

    const payload = axios({ dispatch, getState })
      .get(sprintf(API.PRODUCT_ITEM, id), { params })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload: payload,
      type: actionTypes.PRODUCT_ITEM
    })
  }
}

export const commentListFetch = (product, data) => {

  return (dispatch, getState) => {
    const params = {
      product,
      ...data
    }

    const payload = axios({ dispatch, getState })
      .get(API.COMMENT_LIST, { params })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload: payload,
      type: actionTypes.COMMENT_LIST
    })
  }
}
export const commentCreateAction = (id, comment) => {
  return (dispatch, getState) => {
    const store = getState()
    const userInfo = path(['userInfo', 'data', 'id'], store)
    const productItem = path(['productItem', 'data', 'id'], store)
    const params = {
      comment,
      client: userInfo,
      product: productItem
    }
    const payload = axios({ dispatch, getState })
      .post(sprintf(API.COMMENT_CREATE, id), params)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload: payload,
      type: actionTypes.COMMENT_CREATE
    })
  }
}
