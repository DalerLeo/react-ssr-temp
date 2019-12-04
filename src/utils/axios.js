import axios from 'axios'
import { path, equals, curry, prop, compose, isNil, pathOr } from 'ramda'
import * as actionTypes from '../constants/actionTypes'
import { API_URL } from '../constants/api'
import responseToCamelCase from './responseToCamelCase'
import expireDocumentCookie from './expireDocumentCookie'
import { getCookie } from './cookie'

const UNAUTHORIZED = 401

export const getPayloadFromSuccess = response => {
  return prop('data', response)
}

export const getPayloadFromError = compose(
  data => !isNil(data) && Promise.reject(data),
  (d) => {
    const errMessage = prop('message', d)
    return pathOr(errMessage, ['response', 'data'])(d)
  }
)
const errorInterceptors = curry((dispatch, error) => {
  const status = path(['response', 'status'], error)

  if (equals(UNAUTHORIZED, status && dispatch)) {
    dispatch({ type: `${actionTypes.LOGIN}_CLEAR` })
    dispatch({ type: `${actionTypes.USER_INFO}_CLEAR` })
    typeof document !== 'undefined' && expireDocumentCookie()
  }
  return Promise.reject(error)
})

const axiosRequest = ({ getState, dispatch }, noAuth = false) => {
  const state = getState && getState()
  const token = path(['login', 'data', 'token'], state)
  axios.defaults.baseURL = `${API_URL}`
  axios.defaults.transformResponse = [responseToCamelCase]
  axios.defaults.timeout = 100000

  if (!noAuth) {
    axios.defaults.headers.common.Authorization = token ? `Token ${token}` : ''
  } else {
    axios.defaults.headers.common = {}
  }

  axios.interceptors.response.use(
    response => response,
    errorInterceptors(dispatch)
  )

  return axios
}

export default axiosRequest
