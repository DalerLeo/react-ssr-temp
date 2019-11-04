import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import fp from 'lodash/fp'
import moment from 'moment'
import axios from 'utils/axios'
import {setCookie} from 'utils/cookie'



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

