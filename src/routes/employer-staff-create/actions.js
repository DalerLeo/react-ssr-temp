import fp from 'lodash/fp'
import axios from 'helpers/axiosHelper'
import toSnakeCase from 'helpers/toSnakeCase'
import sprintf from 'sprintf'
import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import _ from 'lodash'

const createSerializer = (data) => {
  return toSnakeCase({
    'full_name': fp.get('fullName', data),
    'email': fp.get('email', data),
    'position': fp.get('position', data),
    'password': fp.get('password', data),
    'phone': fp.get('phone', data)
  })
}

export const employerStaffCreate = (data) => {
  return (dispatch, getState) => {
    const params = createSerializer(data)
    const payload = axios({ dispatch, getState })
      .post(sprintf(API.EMPLOYER_STAFF_CREATE), params)
      .then(response => {
        return fp.get('data', response)
      })
    return dispatch({
      payload,
      type: actionTypes.EMPLOYER_STAFF_CREATE
    })
  }
}

export const employerStaffUpdate = (id, data) => {
  return (dispatch, getState) => {
    const params = createSerializer(data)
    const payload = axios({ dispatch, getState })
      .put(sprintf(API.EMPLOYER_STAFF_UPDATE, id), params)
      .then(response => {
        return fp.get('data', response)
      })
    return dispatch({
      payload,
      type: actionTypes.EMPLOYER_STAFF_UPDATE
    })
  }
}

export const employerStaffItemFetch = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.EMPLOYER_STAFF_ITEM, id))
      .then(response => {
        return _.get(response, 'data')
      })

    return dispatch({
      payload: payload,
      type: actionTypes.EMPLOYER_STAFF_ITEM
    })
  }
}
