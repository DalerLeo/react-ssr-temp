import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import axios, { getPayloadFromError, getPayloadFromSuccess } from 'utils/axios'
import { sprintf } from 'sprintf-js'

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

export const commentListFetch = (id, data) => {
  return (dispatch, getState) => {
    const params = {
      ...data
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

export const commentCreateAction = (id, comment, commentId) => {
  return (dispatch, getState) => {
    const params = {

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
