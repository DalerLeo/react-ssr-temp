import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import axios, { getPayloadFromSuccess, getPayloadFromError } from 'utils/axios'
import { sprintf } from 'sprintf-js'

export const orderDetailAction = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.ORDER_ITEM, id))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)
    return dispatch({
      payload,
      type: actionTypes.ORDER_ITEM
    })
  }
}
