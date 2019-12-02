import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import axios, { getPayloadFromSuccess, getPayloadFromError } from 'utils/axios'
import sprintf from 'sprintf'

export const favoriteListFetch = (data, type) => {
  return (dispatch, getState) => {
    const params = {
      page_size: 150
    }
    const payload = axios({ dispatch, getState })
      .get(API.FAVOURITE_LIST, { params })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.FAVOURITE_LIST
    })
  }
}

export const favouriteCreateAction = (product) => {
  return (dispatch, getState) => {
    const params = {
      product
    }
    const payload = axios({ dispatch, getState })
      .post(API.FAVOURITE_CREATE, params)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.FAVOURITE_CREATE
    })
  }
}

export const favouriteDeleteAction = (id) => {
  return (dispatch, getState) => {
    const params = {
      product: id
    }
    const payload = axios({ dispatch, getState })
      .delete(sprintf(API.FAVOURITE_DELETE, params))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.FAVOURITE_DELETE
    })
  }
}
