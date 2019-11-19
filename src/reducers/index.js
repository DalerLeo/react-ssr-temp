import * as actionTypes from 'constants/actionTypes'
import * as STATE from 'constants/stateNames'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'redux-first-routing'
import { combineReducers } from 'redux'
import createThunkReducer from 'utils/createThunkReducer'
import createStandardReducer from 'helpers/createStandardReducer'

const rootReducer = combineReducers({
  form: formReducer,
  router: routerReducer,
  lang: createThunkReducer(actionTypes.LANGUAGE),
  cart: createThunkReducer(actionTypes.CART_LIST),
  notifications: createThunkReducer(actionTypes.NOTIFICATIONS),
  asyncLoading: createStandardReducer(actionTypes.ASYNC_LOADING),
  notify: createStandardReducer(actionTypes.NOTIFY_OPEN),
  [STATE.LOGIN]: createThunkReducer(actionTypes.LOGIN),
  [STATE.USER_INFO]: createThunkReducer(actionTypes.USER_INFO),
  reset: createThunkReducer(actionTypes.USER_RESET_PASSWORD),
  register: createThunkReducer(actionTypes.REGISTER),
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
  productCategoryList: createThunkReducer(actionTypes.PRODUCT_CATEGORY_LIST),
  menuAs: createThunkReducer(actionTypes.MENU_AS),
  feedback: createThunkReducer(actionTypes.FEEDBACK_CREATE),
  address: createThunkReducer(actionTypes.CREATE_ADDRESS)
})

export default rootReducer
