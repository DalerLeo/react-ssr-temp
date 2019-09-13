import fp from 'lodash/fp'
import sprintf from 'sprintf'
import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import axios from 'helpers/axiosHelper'
import toSnakeCase from 'helpers/toSnakeCase'
import not from 'helpers/not'
import { removeFalsy } from 'helpers/get'
import { dateStringFormat } from 'helpers/customDate'
import { convertEmptyValuesToNull } from 'helpers/convert'
import numberWithoutSpaces from 'helpers/numberWithoutSpaces'

const convertToNull = (value, condition) => {
  if (condition) return null
  return value
}

const createSerializer = (data, fields) => {
  const hasExperience = fp.get('hasExperience', data)
  const isContractualSalary = fp.get('isContractualSalary', data)
  const fromSalary = isContractualSalary ? null : numberWithoutSpaces(fp.get('fromSalary', data))
  const currency = isContractualSalary ? null : fp.get('currency', data)
  const experiences = fp.flow(
    fp.map(item => {
      const country = fp.get('country', item)
      const region = fp.get('region', item)
      const city = fp.get('city', item)
      const newCity = fp.get('newCity', item)
      return removeFalsy({
        country: newCity ? null : (city || region || country),
        organization: fp.get('organization', item),
        position: fp.get('position', item),
        speciality: fp.get('speciality', item),
        duties: fp.get('duties', item),
        fromDate: dateStringFormat(fp.get('fromDate', item)),
        toDate: fp.get('present', item) ? 'present' : dateStringFormat(fp.get('toDate', item)),
        newCity: newCity ? { parent: country, name: newCity } : null
      })
    }),
    fp.filter(fp.flow(fp.isEmpty, not))
  )(fp.get('exp', data))

  const educations = fp.flow(
    fp.map(item => {
      const educationLevel = fp.get('educationLevel', item)
      const clearOtherFields = fp.includes(educationLevel, [
        'average',
        'lower_secondary'
      ])
      return removeFalsy({
        educationLevel,
        institution: convertToNull(fp.get('institution', item), clearOtherFields),
        faculty: convertToNull(fp.get('faculty', item), clearOtherFields),
        speciality: convertToNull(fp.get('speciality', item), clearOtherFields),
        country: convertToNull(fp.get('country', item), clearOtherFields),
        fromDate: dateStringFormat(fp.get('fromDate', item)),
        toDate: fp.get('present', item) ? 'present' : dateStringFormat(fp.get('toDate', item))
      })
    }),
    fp.filter(fp.flow(fp.isEmpty, not))
  )(fp.get('edu', data))

  const extraEducations = fp.flow(
    fp.map(item => {
      if (fp.isEmpty(item)) return {}
      return removeFalsy({
        educationLevel: 'additional',
        degree: 'other',
        institution: fp.get('institution', item),
        speciality: fp.get('speciality', item),
        fromDate: dateStringFormat(fp.get('fromDate', item)),
        country: fp.get('country', item),
        toDate: fp.get('present', item) ? 'present' : dateStringFormat(fp.get('toDate', item))
      })
    }),
    fp.filter(fp.flow(fp.isEmpty, not))
  )(fp.get('extraEdu', data))

  const requestData = {
    wishedIndustries: fp.get('wishedIndustries', data),
    fromSalary,
    currency,
    isContractualSalary,
    driverLicences: fp.get('driverLicences', data),
    livingPlace: fp.get('livingPlace', data),
    isReadyTravel: fp.get('isReadyTravel', data),
    isReadyMove: fp.get('isReadyMove', data),
    employmentType: fp.get('employmentType', data),
    computerKnowledge: fp.get('computerKnowledge', data),
    compLiteracyLevel: fp.get('compLiteracyLevel', data),
    hobbies: fp.get('hobbies', data),
    languageSkills: fp.filter(item => item.level, fp.get('languageSkills', data)),
    additionalInfo: fp.get('additionalInfo', data),
    title: fp.get('title', data),
    experiences: hasExperience ? experiences : [],
    educations: [
      ...educations,
      ...extraEducations
    ],
    isTemp: fp.get('isTemp', data),
    isActive: fp.get('isActive', data)
  }
  const picked = fields ? fp.pick(fields, requestData) : requestData
  return fp.flow(
    toSnakeCase,
    convertEmptyValuesToNull
  )(picked)
}

export const createResumeAction = data => {
  const params = createSerializer(data)
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.RESUME_CREATE, params)
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.RESUME_CREATE
    })
  }
}

export const updateResumeAction = (data, fields, id) => {
  const params = createSerializer(data, fields)
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .patch(sprintf(API.RESUME_UPDATE, Number(id)), params)
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.RESUME_UPDATE
    })
  }
}

export const resumeFetchItem = id => {
  return (dispatch, getState) => {
    const params = {
    }
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.RESUME_ITEM, fp.toNumber(id)), { params })
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.RESUME_ITEM
    })
  }
}

export const resumeDeleteAction = id => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .delete(sprintf(API.RESUME_DELETE, id))
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.RESUME_DELETE
    })
  }
}
