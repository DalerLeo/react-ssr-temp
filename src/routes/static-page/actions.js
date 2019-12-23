import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import {sprintf} from 'sprintf-js'
import axios, { getPayloadFromError, getPayloadFromSuccess } from 'utils/axios'

export const getStaticPagesList = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.STATIC_PAGES)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)
    return dispatch({
      payload,
      type: actionTypes.STATIC_PAGES
    })
  }
}

export const getStaticPageItem = (keyname) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.STATIC_PAGES_ITEM, keyname))
      .then(getPayloadFromSuccess)

    return dispatch({
      payload,
      type: actionTypes.STATIC_PAGES_ITEM
    })
  }
}
