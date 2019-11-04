import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import fpGet from 'lodash/fp/get'
import axios from 'helpers/axiosHelper'

export const getProductList = () => {
  return (dispatch, getState) => {
    const params = {
    }

    const payload = axios({ dispatch, getState })
      .get(API.PRODUCT_LIST, { params })
      .then(fpGet('data'))

    return dispatch({
      payload: payload,
      type: actionTypes.PRODUCT_LIST
    })
  }
}

export const getProfessionsList = () => {
  return (dispatch, getState) => {
    const params = {
      page_size: 1000,
      parents_only: true,
      ordering: 'name_ru'
    }

    const payload = axios({ dispatch, getState })
      .get(API.PROFESSIONS_LIST, { params })
      .then(fpGet('data'))

    return dispatch({
      payload: payload,
      type: actionTypes.PROFESSIONS_LIST
    })
  }
}

export const getSpecialityListAll = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.SPECIALITY_LIST_ALL)
      .then(fpGet('data'))

    return dispatch({
      payload: payload,
      type: actionTypes.SPECIALITY_LIST_ALL
    })
  }
}

export const getRegionsList = (type) => {
  return (dispatch, getState) => {
    const params = {
      page_size: 100,
      type: type
    }

    const payload = axios({ dispatch, getState })
      .get(API.REGIONS_LIST, { params })
      .then(fpGet('data'))

    return dispatch({
      payload: payload,
      type: actionTypes.REGIONS_LIST
    })
  }
}

export const getEmployerList = (type) => {
  return (dispatch, getState) => {
    const params = {
      page_size: 8,
      ordering: 'name'
    }

    const companyListAPI = type === 'company-week'
      ? API.COMPANY_WEEK_LIST
      : API.COMPANY_POPULAR_LIST

    const payload = axios({ dispatch, getState })
      .get(companyListAPI, { params })
      .then(fpGet('data'))

    return dispatch({
      payload: payload,
      type: actionTypes.EMPLOYER_LIST
    })
  }
}

export const getResumeList = (data) => {
  return (dispatch, getState) => {
    const params = {
      page_size: 10,
      ...data
    }

    const payload = axios({ dispatch, getState })
      .get(API.RESUME_ACTIVE_LIST, { params })
      .then(fpGet('data'))

    return dispatch({
      payload: payload,
      type: actionTypes.RESUME_ACTIVE_LIST
    })
  }
}
export const getVacancyList = (data) => {
  return (dispatch, getState) => {
    const params = {
      ...data,
      page_size: fpGet(data, 'pageSize')
    }

    const payload = axios({ dispatch, getState })
      .get(API.VACANCY_APPROVED_LIST, { params })
      .then(fpGet('data'))

    return dispatch({
      payload: payload,
      type: actionTypes.VACANCY_APPROVED_LIST
    })
  }
}

export const fetchPopularVacancyList = (data) => {
  return (dispatch, getState) => {
    const params = { page_size: '5' }

    const payload = axios({ dispatch, getState })
      .get(API.VACANCY_POPULAR_LIST, { params })
      .then(fpGet('data'))

    return dispatch({
      payload: payload,
      type: actionTypes.VACANCY_POPULAR_LIST
    })
  }
}

export const generalStatsFetch = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.GENERAL_STATS)
      .then(fpGet('data'))

    return dispatch({
      payload,
      type: actionTypes.GENERAL_STATS
    })
  }
}
