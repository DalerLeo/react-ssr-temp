import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import axios, { getPayloadFromError, getPayloadFromSuccess } from 'utils/axios'
import { prop, path } from 'ramda'
import { sprintf } from 'sprintf-js'

export const updateClientAction = (id, data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .put(sprintf(API.CLIENT_UPDATE, id), data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)
    return dispatch({
      payload: payload,
      type: actionTypes.USER_INFO
    })
  }
}

export const addressListAction = (data, type) => {
  return (dispatch, getState) => {
    const params = {
      page_size: 150
    }
    const payload = axios({ dispatch, getState })
      .get(API.ADDRESS_LIST, { params })
      .then(response => {
        return path(['data', 'results'], response)
      })
    return dispatch({
      payload,
      type: actionTypes.ADDRESS_LIST
    })
  }
}

export const addressDeleteAction = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .delete(sprintf(API.ADDRESS_DELETE, id))
      .then(response => {
        return path('data', response)
      })

    return dispatch({
      payload,
      type: actionTypes.ADDRESS_DELETE
    })
  }
}

export const activateMailingAction = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.ACTIVATE_MAILING, id))
      .then(response => {
        return path('data', response)
      })

    return dispatch({
      payload,
      type: actionTypes.ACTIVATE_MAILING
    })
  }
}

export const deactivateMailingAction = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.DEACTIVATE_MAILING, id))
      .then(response => {
        return path('data', response)
      })

    return dispatch({
      payload,
      type: actionTypes.DEACTIVATE_MAILING
    })
  }
}
