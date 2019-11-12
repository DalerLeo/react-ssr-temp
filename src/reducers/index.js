import * as actionTypes from 'constants/actionTypes'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'redux-first-routing'
import { combineReducers } from 'redux'
import createThunkReducer from 'helpers/createThunkReducer'
import createStandardReducer from 'helpers/createStandardReducer'

const rootReducer = combineReducers({
  form: formReducer,
  router: routerReducer,
  lang: createThunkReducer(actionTypes.LANGUAGE),
  cart: createThunkReducer(actionTypes.CART_LIST),
  activeUsers: createThunkReducer(actionTypes.ACTIVE_USERS_COUNT),
  notifications: createThunkReducer(actionTypes.NOTIFICATIONS),
  staticPages: combineReducers({
    list: createThunkReducer(actionTypes.STATIC_PAGES),
    item: createThunkReducer(actionTypes.STATIC_PAGES_ITEM)
  }),
  stats: createThunkReducer(actionTypes.GENERAL_STATS),
  professions: createThunkReducer(actionTypes.PROFESSIONS_LIST),
  regions: createThunkReducer(actionTypes.REGIONS_LIST),
  activation: createStandardReducer(actionTypes.USER_ACTIVATION),
  asyncLoading: createStandardReducer(actionTypes.ASYNC_LOADING),
  notify: createStandardReducer(actionTypes.NOTIFY_OPEN),
  chatDialog: createStandardReducer(actionTypes.CHAT_DIALOG_OPEN),
  login: createThunkReducer(actionTypes.LOGIN),
  user: createThunkReducer(actionTypes.USER_INFO),
  reset: createThunkReducer(actionTypes.USER_RESET_PASSWORD),
  register: createThunkReducer(actionTypes.REGISTER),
  searchHistory: createThunkReducer(actionTypes.SEARCH_HISTORY),
  searchCreate: createThunkReducer(actionTypes.SEARCH_HISTORY_CREATE),
  searchList: createThunkReducer(actionTypes.SEARCH_LIST),
  common: combineReducers({
    driverLicence: createThunkReducer(actionTypes.DRIVER_LICENSE_LIST),
    speciality: createThunkReducer(actionTypes.SPECIALITY_LIST),
    specialityAll: createThunkReducer(actionTypes.SPECIALITY_LIST_ALL),
    institution: createThunkReducer(actionTypes.INSTITUTION_LIST),
    institutionCreate: createThunkReducer(actionTypes.INSTITUTION_CREATE),
    country: createThunkReducer(actionTypes.COUNTRY_LIST),
    currency: createThunkReducer(actionTypes.CURRENCY_LIST),
    language: createThunkReducer(actionTypes.LANGUAGE_LIST)
  }),
  article: combineReducers({
    list: createThunkReducer(actionTypes.ARTICLE_LIST),
    item: createThunkReducer(actionTypes.ARTICLE_ITEM)
  }),
  employer: combineReducers({
    list: createThunkReducer(actionTypes.EMPLOYER_LIST),
    item: createThunkReducer(actionTypes.EMPLOYER_ITEM),
    statGeneral: createThunkReducer(actionTypes.STAT_EMPLOYER_GENERAL),
    statViews: createThunkReducer(actionTypes.STAT_EMPLOYER_VIEWS),
    statVacancyViews: createThunkReducer(actionTypes.STAT_EMPLOYER_VACANCY_VIEWS),
    staffCreate: createThunkReducer(actionTypes.EMPLOYER_STAFF_CREATE),
    guests: createThunkReducer(actionTypes.EMPLOYER_GUESTS)
  }),
  applicant: combineReducers({
    list: createThunkReducer(actionTypes.APPLICANT_LIST),
    item: createThunkReducer(actionTypes.APPLICANT_ITEM),
    update: createThunkReducer(actionTypes.APPLICANT_UPDATE),
    favVacancies: createThunkReducer(actionTypes.APPLICANT_FAV_VACANCY_LIST),
    favEmployers: createThunkReducer(actionTypes.APPLICANT_FAV_EMPLOYERS_LIST)
  }),
  vacancy: combineReducers({
    list: createThunkReducer(actionTypes.VACANCY_APPROVED_LIST),
    item: createThunkReducer(actionTypes.VACANCY_APPROVED_ITEM),
    create: createThunkReducer(actionTypes.VACANCY_CREATE),
    activate: createThunkReducer(actionTypes.VACANCY_ACTIVATE),
    deactivate: createThunkReducer(actionTypes.VACANCY_DEACTIVATE),
    favCreate: createThunkReducer(actionTypes.VACANCY_FAV_CREATE),
    update: createThunkReducer(actionTypes.VACANCY_UPDATE),
    popList: createThunkReducer(actionTypes.VACANCY_POPULAR_LIST),
    appealedList: createThunkReducer(actionTypes.VACANCY_APPEALED_LIST),
    appealedChangeStatus: createThunkReducer(actionTypes.VACANCY_APPEALED_ITEM_STATUS_CHANGE),
    appealedItem: createThunkReducer(actionTypes.VACANCY_APPEALED_ITEM),
    appealedItemCount: createThunkReducer(actionTypes.VACANCY_APPEALED_ITEM_COUNT),
    viewHistory: createThunkReducer(actionTypes.VACANCY_ITEM_VIEW_HISTORY)
  }),
  comment: combineReducers({
    list: createThunkReducer(actionTypes.COMMENT_LIST),
    item: createThunkReducer(actionTypes.COMMENT_ITEM),
    create: createThunkReducer(actionTypes.COMMENT_CREATE)
  }),
  vacancyAppeal: combineReducers({
    list: createThunkReducer(actionTypes.VACANCY_APPEAL_LIST),
    item: createThunkReducer(actionTypes.VACANCY_APPEAL_LIST),
    create: createThunkReducer(actionTypes.VACANCY_APPEAL_CREATE)
  }),
  employerAppeal: combineReducers({
    create: createThunkReducer(actionTypes.EMPLOYER_APPEAL_CREATE),
    list: createThunkReducer(actionTypes.EMPLOYER_APPEAL_LIST)
  }),
  resume: combineReducers({
    list: createThunkReducer(actionTypes.RESUME_LIST),
    favList: createThunkReducer(actionTypes.RESUME_FAV_LIST),
    favCreate: createThunkReducer(actionTypes.RESUME_FAV_CREATE),
    create: createThunkReducer(actionTypes.RESUME_CREATE),
    update: createThunkReducer(actionTypes.RESUME_UPDATE),
    activeList: createThunkReducer(actionTypes.RESUME_ACTIVE_LIST),
    activeItem: createThunkReducer(actionTypes.RESUME_ACTIVE_ITEM),
    item: createThunkReducer(actionTypes.RESUME_ITEM),
    updateDate: createThunkReducer(actionTypes.RESUME_ITEM_UPDATE_DATE),
    activate: createThunkReducer(actionTypes.RESUME_ACTIVATE),
    deactivate: createThunkReducer(actionTypes.RESUME_DEACTIVATE),
    guests: createThunkReducer(actionTypes.RESUME_ITEM_GUESTS),
    suitable: createThunkReducer(actionTypes.RESUME_SUITABLE_LIST),
    invite: createThunkReducer(actionTypes.RESUME_INVITE)
  }),
  employerStaff: combineReducers({
    list: createThunkReducer(actionTypes.EMPLOYER_STAFF_LIST),
    item: createThunkReducer(actionTypes.EMPLOYER_STAFF_ITEM),
    create: createThunkReducer(actionTypes.EMPLOYER_STAFF_CREATE),
    update: createThunkReducer(actionTypes.EMPLOYER_STAFF_UPDATE),
    delete: createThunkReducer(actionTypes.EMPLOYER_STAFF_DELETE)
  }),
  employerOrders: combineReducers({
    list: createThunkReducer(actionTypes.EMPLOYER_ORDERS_LIST),
    item: createThunkReducer(actionTypes.EMPLOYER_ORDERS_ITEM)
  }),
  chat: combineReducers({
    list: createThunkReducer(actionTypes.EMPLOYER_APPEAL_CHAT),
    front: createThunkReducer(actionTypes.FRONT_CHAT_LIST)
  }),
  faq: createThunkReducer(actionTypes.FAQ_LIST),
  service: combineReducers({
    discounts: createThunkReducer(actionTypes.VACNACY_SERVICE_DISCOUNTS),
    minPrices: createThunkReducer(actionTypes.SERVICES_MIN_PRICES),
    activate: createThunkReducer(actionTypes.SERVICES_ACTIVATE),
    applicant: createThunkReducer(actionTypes.APPLICANT_SERVICE_LIST),
    employer: createThunkReducer(actionTypes.EMPLOYER_SERVICE_LIST),
    databaseAccess: createThunkReducer(actionTypes.DATABASE_ACCESS_LIST),
    databasePeriod: createThunkReducer(actionTypes.DATABASE_ACCESS_ITEM),
    vipPacket: createThunkReducer(actionTypes.VIP_PACKET_LIST),
    fillBalance: createThunkReducer(actionTypes.FILL_BALANCE)
  }),
  order: combineReducers({
    create: createThunkReducer(actionTypes.ORDER_CREATE),
    list: createThunkReducer(actionTypes.ORDER_LIST),
    item: createThunkReducer(actionTypes.ORDER_ITEM),
    activate: createThunkReducer(actionTypes.ORDER_ACTIVATE),
    makePayment: createThunkReducer(actionTypes.ORDER_MAKE_PAYMENT),
    contract: createThunkReducer(actionTypes.ORDER_REQUEST_CONTRACT)
  }),
  userServices: combineReducers({
    list: createThunkReducer(actionTypes.USER_ACTIVE_SERVICES),
    unused: createThunkReducer(actionTypes.USER_UNUSED_SERVICES)
  }),
  productList: createThunkReducer(actionTypes.PRODUCT_LIST),
  productCategoryList: createThunkReducer(actionTypes.PRODUCT_CATEGORY_LIST),
  menuAs: createThunkReducer(actionTypes.MENU_AS),
  feedback: createThunkReducer(actionTypes.FEEDBACK_CREATE)
})

export default rootReducer
