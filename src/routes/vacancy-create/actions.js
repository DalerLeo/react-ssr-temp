import fp from 'lodash/fp'
import sprintf from 'sprintf'
import axios from 'helpers/axiosHelper'
import toSnakeCase from 'helpers/toSnakeCase'
import { convertEmptyValuesToNull } from 'helpers/convert'
import numberWithoutSpaces from 'helpers/numberWithoutSpaces'
import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import { joinArray } from 'helpers/joinSplitValues'

const createSerializer = (data) => {
  const ageFrom = fp.get('from', data)
  const ageTo = fp.get('to', data)
  const requestData = {
    specialities: fp.get('specialities', data) || [],
    industry: fp.get('sphere', data),
    salary: numberWithoutSpaces(fp.get('fromSalary', data)),
    driverLicences: fp.get('driverLicences', data) || [],
    place: fp.get('place', data),
    salaryFrom: fp.get('salaryFrom', data),
    salaryTo: fp.get('salaryTo', data),
    educationLevel: fp.get('educationLevel', data),
    gender: fp.get('gender', data),
    duties: fp.get('duties', data),
    employmentType: fp.get('employmentType', data),
    currency: fp.get('currency', data),
    questions: fp.get('questions', data),
    age: fp.flow(
      fp.filter(item => item),
      fp.join('-')
    )([ageFrom, ageTo]),
    bonus: joinArray(fp.get('bonus', data)),
    experience: fp.get('experience', data),
    requirements: fp.get('requirements', data),
    computerKnowledge: fp.get('computerKnowledge', data),
    compLiteracyLevel: fp.get('compLiteracyLevel', data),
    languageRequirements: fp.filter(item => item.level, fp.get('languageRequirements', data)),
    additionalInformation: fp.get('additionalInformation', data),
    title: fp.get('title', data),
    isActive: fp.get('isActive', data),
    isTemp: fp.get('isTemp', data)
  }

  return fp.flow(
    convertEmptyValuesToNull,
    toSnakeCase
  )(requestData)
}

export const createVacancyAction = (data) => {
  const params = createSerializer(data)
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.VACANCY_CREATE, params)
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.VACANCY_CREATE
    })
  }
}

export const updateVacancyAction = (data, id) => {
  const params = createSerializer(data)
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .put(sprintf(API.VACANCY_UPDATE, Number(id)), params)
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.VACANCY_UPDATE
    })
  }
}

export const vacancyFetchItem = (id) => {
  return (dispatch, getState) => {
    const params = {}
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.VACANCY_ITEM, fp.toNumber(id)), { params })
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.VACANCY_APPROVED_ITEM
    })
  }
}

export const vacancyDeleteAction = id => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .delete(sprintf(API.VACANCY_DELETE, id))
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.VACANCY_DELETE
    })
  }
}

export const activeServicesFetch = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.USER_UNUSED_SERVICES)
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.USER_UNUSED_SERVICES
    })
  }
}
