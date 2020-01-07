import * as actionTypes from 'constants/actionTypes'
import * as STATE from 'constants/stateNames'
import { routerReducer } from 'redux-first-routing'
import { combineReducers } from 'redux'
import createThunkReducer from 'utils/createThunkReducer'
import createStandardReducer from 'utils/createStandardReducer'
import { cartReducer } from './customReducers'

const rootReducer = combineReducers({
  router: routerReducer,
  lang: createThunkReducer(actionTypes.LANGUAGE),
  [STATE.CART]: cartReducer(),
  notifications: createThunkReducer(actionTypes.NOTIFICATIONS),
  asyncLoading: createStandardReducer(actionTypes.ASYNC_LOADING),
  notify: createStandardReducer(actionTypes.NOTIFY_OPEN),
  [STATE.LOGIN]: createThunkReducer(actionTypes.LOGIN),
  [STATE.USER_INFO]: createThunkReducer(actionTypes.USER_INFO),
  reset: createThunkReducer(actionTypes.USER_RESET_PASSWORD),
  register: createThunkReducer(actionTypes.REGISTER),
  [STATE.ORDER_CREATE]: createThunkReducer(actionTypes.ORDER_CREATE),
  [STATE.ORDER_LIST]: createThunkReducer(actionTypes.ORDER_LIST),
  [STATE.ORDER_ITEM]: createThunkReducer(actionTypes.ORDER_ITEM),
  article: combineReducers({
    list: createThunkReducer(actionTypes.ARTICLE_LIST),
    item: createThunkReducer(actionTypes.ARTICLE_ITEM)
  }),
  comment: combineReducers({
    list: createThunkReducer(actionTypes.COMMENT_LIST),
    item: createThunkReducer(actionTypes.COMMENT_ITEM),
    create: createThunkReducer(actionTypes.COMMENT_CREATE)
  }),
  faq: createThunkReducer(actionTypes.FAQ_LIST),
  [STATE.PRODUCT_LIST]: createThunkReducer(actionTypes.PRODUCT_LIST),
  [STATE.PRODUCT_ITEM]: createThunkReducer(actionTypes.PRODUCT_ITEM),
  [STATE.FAVOURITE_LIST]: createThunkReducer(actionTypes.FAVOURITE_LIST),
  [STATE.FAVOURITE_CREATE]: createThunkReducer(actionTypes.FAVOURITE_CREATE),
  [STATE.FILTER_LIST]: createThunkReducer(actionTypes.FILTER_LIST),
  [STATE.PRODUCT_CATEGORY_LIST]: createThunkReducer(actionTypes.PRODUCT_CATEGORY_LIST),
  [STATE.MENU_AS]: createThunkReducer(actionTypes.MENU_AS),
  feedback: createThunkReducer(actionTypes.FEEDBACK_CREATE),
  [STATE.ADDRESS_CREATE]: createThunkReducer(actionTypes.ADDRESS_CREATE),
  [STATE.ADDRESS_LIST]: createThunkReducer(actionTypes.ADDRESS_LIST),
  [STATE.COMMENT_CREATE]: createThunkReducer(actionTypes.COMMENT_CREATE),
  [STATE.COMMENT_LIST]: createThunkReducer(actionTypes.COMMENT_LIST),
  [STATE.ACTIVATE_MAILING]: createThunkReducer(actionTypes.ACTIVATE_MAILING),
  [STATE.DEACTIVATE_MAILING]: createThunkReducer(actionTypes.DEACTIVATE_MAILING),
})

export default rootReducer
