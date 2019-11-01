import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import fpGet from 'lodash/fp/get'
import toSnakeCase from 'helpers/toSnakeCase'
import axios from 'helpers/axiosHelper'

export const sendFeedbackAction = data => {
  return (dispatch, getState) => {
    const requestData = toSnakeCase(data)
    const payload = axios({ dispatch, getState })
      .post(API.FEEDBACK_CREATE, requestData)
      .then(fpGet('data'))

    return dispatch({
      payload,
      type: actionTypes.FEEDBACK_CREATE
    })
  }
}
