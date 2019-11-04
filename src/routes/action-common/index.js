import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import fp from 'lodash/fp'
import moment from 'moment'
import axios from 'helpers/axiosHelper'
import toSnakeCase from 'helpers/toSnakeCase'
import setCookie from 'helpers/setCookie'

export const getSpecialityList = (param) => {
  return (dispatch, getState) => {
    const params = toSnakeCase({
      ...param
    })
    const payload = axios({ dispatch, getState })
      .get(API.SPECIALITY_LIST, { params })
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.SPECIALITY_LIST
    })
  }
}
export const getInstitutionList = (param) => {
  return (dispatch, getState) => {
    const params = toSnakeCase({
      ...param
    })
    const payload = axios({ dispatch, getState })
      .get(API.INSTITUTION_LIST, { params })
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.INSTITUTION_LIST
    })
  }
}

export const getRegionsList = () => {
  return (dispatch, getState) => {
    const params = {
      page_size: 100,
      ordering: 'name'
    }
    const payload = axios({ dispatch, getState })
      .get(API.REGIONS_LIST, { params })
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.REGIONS_LIST
    })
  }
}

export const getDriverLicenseList = () => {
  return (dispatch, getState) => {
    const params = {
      page_size: 100,
      ordering: 'name'
    }
    const payload = axios({ dispatch, getState })
      .get(API.DRIVER_LICENSE_LIST, { params })
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.DRIVER_LICENSE_LIST
    })
  }
}

export const getCurrencyList = () => {
  return (dispatch, getState) => {
    const params = {
      page_size: 100,
      ordering: 'name'
    }
    const payload = axios({ dispatch, getState })
      .get(API.CURRENCY_LIST, { params })
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.CURRENCY_LIST
    })
  }
}

export const institutionCreateAction = (params) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.INSTITUTION_LIST, params)
      .then(fp.get('data'))
    return dispatch({
      payload,
      type: actionTypes.INSTITUTION_CREATE
    })
  }
}

export const countryListAction = (param) => {
  const params = {
    page_size: '1000',
    type: 'country',
    ...param

  }
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.REGIONS_LIST, { params })
      .then(fp.get('data'))
    return dispatch({
      payload,
      type: actionTypes.COUNTRY_LIST
    })
  }
}

export const languageListAction = (param) => {
  const params = {
    page_size: fp.get('pageSize', param) || '100',
    ...param
  }
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.LANGUAGES_LIST, { params })
      .then(fp.get('data'))
    return dispatch({
      payload,
      type: actionTypes.LANGUAGE_LIST
    })
  }
}

export const setAppLanguageAction = (lang) => {
  const ONE_YEAR = 365
  return dispatch => {
    if (lang === 'uz') moment.locale('uz-latn')
    else moment.locale(lang)

    setCookie('lang', lang, ONE_YEAR)
    return dispatch({
      payload: Promise.resolve(lang),
      type: actionTypes.LANGUAGE
    })
  }
}

export const getActiveUsersCount = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.ACTIVE_USERS_COUNT)
      .then(fp.get('data'))
    return dispatch({
      payload,
      type: actionTypes.ACTIVE_USERS_COUNT
    })
  }
}

export const getNotificationsCount = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.NOTIFICATIONS)
      .then(fp.get('data'))
    return dispatch({
      payload,
      type: actionTypes.NOTIFICATIONS
    })
  }
}

