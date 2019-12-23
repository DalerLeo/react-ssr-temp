import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'redux-first-routing'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from '../reducers'

export default (history, initialState, logger) => {
  const middleware = [
    promiseMiddleware,
    thunkMiddleware,
    routerMiddleware(history)
  ]

  if (process.env.NODE_ENV === 'development' && logger) {
    const createLogger = require('redux-logger').createLogger
    middleware.push(createLogger({ collapsed: (getState, action, logEntry) => !logEntry.error }))
  }

  return createStore(rootReducer, initialState, applyMiddleware(...middleware))
}
