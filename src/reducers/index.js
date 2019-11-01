import { routerReducer } from 'redux-first-routing'
import { combineReducers } from 'redux'
import * as actionTypes from '../constants/actionTypes'
import createThunkReducer from '../utils/createThunkReducer'

const rootReducer = combineReducers({
  router: routerReducer,
  lang: createThunkReducer(actionTypes.LANGUAGE),
  cart: createThunkReducer(actionTypes.CART_LIST),
  article: combineReducers({
    list: createThunkReducer(actionTypes.ARTICLE_LIST),
    item: createThunkReducer(actionTypes.ARTICLE_ITEM)
  }),
})

export default rootReducer
