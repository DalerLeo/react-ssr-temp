import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import axios, { getPayloadFromError, getPayloadFromSuccess } from 'utils/axios'

export const menuAs = () => {
  return (dispatch, getState) => {
    const params = {
      page_size: 20,
      parent: 0
    }

    const payload = axios({ dispatch, getState })
      .get(API.MENU_AS, { params })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload: payload,
      type: actionTypes.MENU_AS
    })
  }
}
export const languageListFetch = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.LANGUAGE_LIST)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload: payload,
      type: actionTypes.LANGUAGE_LIST
    })
  }
}
