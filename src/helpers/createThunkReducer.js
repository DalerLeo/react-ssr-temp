import createReducer from './createReducer'
import loGet from 'lodash/get'
import loPick from 'lodash/pick'

const defaultState = {
  data: null,
  error: null,
  loading: false,
  failed: false
}

const createThunkReducer = (actionName) => {
  return createReducer(defaultState, {
    [`${actionName}_PENDING`] (state) {
      return {
        ...state,
        loading: true
      }
    },
    [`${actionName}_FULFILLED`] (state, action) {
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
        failed: false
      }
    },
    [`${actionName}_REJECTED`] (state, action) {
      const error = loPick(loGet(action, 'payload.response'), ['data', 'status', 'statusText'])
      return {
        ...state,
        data: null,
        error: error,
        loading: false,
        failed: true
      }
    },
    [`${actionName}_CLEAR`] () {
      return defaultState
    }
  })
}

export default createThunkReducer
