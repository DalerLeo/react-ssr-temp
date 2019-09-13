import fp from 'lodash/fp'
import axios from 'helpers/axiosHelper'
import toSnakeCase from 'helpers/toSnakeCase'
import sprintf from 'sprintf'
import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import { convertEmptyValuesToNull } from 'helpers/convert'

export const applicantUpdateAction = (data, id) => {
  return (dispatch, getState) => {
    const params = toSnakeCase({
      fullName: fp.get('name', data),
      livingPlace: fp.get('livingPlace', data),
      phone: fp.get('phone', data),
      email: fp.get('email', data),
      password: fp.get('password', data),
      maritalStatus: fp.get('maritalStatus', data),
      searchWorkStatus: fp.get('searchWorkStatus', data),
      extraPhone: fp.get('extraPhone', data),
      gender: fp.get('gender', data),
      photo: fp.get('photo.id', data),
      otherContacts: JSON.stringify(fp.get('otherContacts', data)),
      birthdate: sprintf('%s-%s-%s', fp.get('year', data), fp.get('month', data), fp.get('day', data))
    })
    const payload = axios({ dispatch, getState })
      .put(sprintf(API.APPLICANT_ITEM, id), convertEmptyValuesToNull(params))
      .then(fp.get('data'))
    return dispatch({
      payload,
      type: actionTypes.APPLICANT_UPDATE
    })
  }
}
export const employerUpdateAction = (data, id) => {
  return (dispatch, getState) => {
    const foundationDate = fp.get('foundationDate', data)
    const params = toSnakeCase({
      address: fp.get('address', data),
      contactPerson: fp.get('contactPerson', data),
      form: fp.get('form', data),
      bankRequisites: fp.get('bankRequisites', data),
      description: fp.get('description', data),
      foundationDate: foundationDate ? `${foundationDate}-01-01` : null,
      industry: fp.get('industry', data),
      logo: fp.get('logo.id', data),
      password: fp.get('password', data),
      siteUrl: fp.get('siteUrl', data),
      staffSize: fp.get('staffSize', data),
      title: fp.get('title', data),
      trademark: fp.get('trademark', data),
      username: fp.get('username', data),
      isRecruiter: fp.get('isRecruiter', data),
      phone: fp.get('phone', data),
      extraPhone: fp.get('extraPhone', data)
    })
    const payload = axios({ dispatch, getState })
      .put(sprintf(API.EMPLOYER_ITEM, id), params)
      .then(fp.get('data'))
    return dispatch({
      payload,
      type: actionTypes.EMPLOYER_ITEM
    })
  }
}

export const userBlockAction = (params) => {
  const requestData = {
    action: 'block',
    ...params
  }
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(sprintf(API.USER_BLOCK), requestData)
      .then(fp.get('data'))
    return dispatch({
      payload,
      type: actionTypes.USER_BLOCK
    })
  }
}
