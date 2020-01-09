import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import axios, { getPayloadFromError, getPayloadFromSuccess } from 'utils/axios'
import { path, prop } from 'ramda'
import { setCookie } from 'utils/cookie'
export const signInAction = (username, password) => {
  return (dispatch, getState) => {
    const phoneNumber = '+998' + username
    const params = {
      username: phoneNumber,
      password
    }
    const payload = axios({ dispatch, getState })
      .post(API.LOGIN, params)
      .then(response => {
        const resp = path(['data'], response)
        const token = path(['token'], resp)
        setCookie('token', token, 1)
        return resp
      })
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.LOGIN
    })
  }
}

export const userInfoCheckToken = (token) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.CHECK_TOKEN + token)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.USER_INFO
    })
  }
}

export const userSignOut = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.LOGOUT)
      .then(response => {
        document.cookie = 'token='
        return prop('data', response)
      })
      .catch(() => {
        document.cookie = 'token='
        dispatch({ type: `${actionTypes.LOGIN}_CLEAR` })
      })
    return dispatch({
      payload,
      type: `${actionTypes.LOGIN}`
    })
  }
}

export const registerAction = (phone) => {
  return (dispatch, getState) => {
    const params = {
      username: '+998' + phone
    }

    const payload = axios({ dispatch, getState })
      .post(API.REGISTER, params)
      .then(getPayloadFromSuccess)

    return dispatch({
      payload,
      type: actionTypes.REGISTER
    })
  }
}
