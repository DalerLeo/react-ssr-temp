import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import axios, { getPayloadFromError, getPayloadFromSuccess } from 'utils/axios'
import { prop } from 'ramda'
import { sprintf } from 'sprintf-js'

export const updateClientAction = (id, data, phoneNumber) => {
  const fullName = prop('fullName', data)
  const password = prop('password', data)
  const requestData = { full_name: fullName, phone_number: phoneNumber, password: password }
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .put(sprintf(API.CLIENT_UPDATE, id), requestData)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)
    return dispatch({
      payload: payload,
      type: actionTypes.USER_INFO
    })
  }
}
