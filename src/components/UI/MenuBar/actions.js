import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import axios, { getPayloadFromError, getPayloadFromSuccess } from 'utils/axios'

export const menuAs = () => {
  return (dispatch, getState) => {
    const params = {}

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
