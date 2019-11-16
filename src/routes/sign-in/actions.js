import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import axios, { getPayloadFromError, getPayloadFromSuccess } from 'utils/axios'
import { path } from 'ramda'
import _ from 'lodash'
import { setCookie } from 'utils/cookie'

export const signInAction = (username, password) => {
  return (dispatch, getState) => {
    const phoneNumber = '+998' + username
    const params = {
      username: phoneNumber,
      password
    }
    const payload = axios({ dispatch, getState })
      .post(API.SIGN_IN, params)
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

export const userSignOut = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.SIGN_OUT)
      .then(response => {
        document.cookie = 'token='
        return _.get(response, 'data')
      })
      .catch(() => {
        document.cookie = 'token='
        //        Dispatch({ type: `${actionTypes.SIGN_IN}_CLEAR` })
        //        Dispatch({ type: `${actionTypes.PRODUCT_FAVORITE}_CLEAR` })
      })
    // Dispatch({ type: `${actionTypes.PRODUCT_FAVORITE}_CLEAR` })
    // Dispatch({ type: `${actionTypes.PRODUCT_FAVORITE_SET}_CLEAR` })
    // SetToCart(JSON.stringify([]))
    // Dispatch({ type: actionTypes.CART_CHANGE_LIST, payload: { data: [] } })
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

// Export const userDataFetchAction = () => {
//   Return (dispatch, getState) => {
//     Const token = _.get(getState(), ['auth', 'signIn', 'data', 'token'])
//     Const payload = axios({ dispatch, getState })
//       .get(API.USER_DETAIL)
//       .then(response => {
//         Return { user: _.get(response, 'data'), token }
//       })

//     Return dispatch({
//       Payload,
//       Type: actionTypes.SIGN_IN
//     })
//   }
// }
