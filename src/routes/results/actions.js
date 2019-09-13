import fpGet from 'lodash/fp/get'
import fpOmit from 'lodash/fp/omit'
import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import axios from 'helpers/axiosHelper'
import toSnakeCase from 'helpers/toSnakeCase'
import queryToParams from 'helpers/queryToParams'

export const getSearchResults = (data) => {
  const excludedData = fpOmit([
    'education',
    'employmentType',
    'driverLicense',
    'catalogue',
    'region'
  ], data)
  const region = fpGet('region', data)
  return (dispatch, getState) => {
    const params = toSnakeCase({
      page_size: 10,
      ...excludedData,
      educationLevel: fpGet('education', data),
      employmentTypes: fpGet('employmentType', data),
      driverLicenses: fpGet('driverLicense', data),
      type: fpGet('type', data) || 'vacancy',
      region: region === 'null' ? '' : region
    })
    const payload = axios({ dispatch, getState })
      .get(API.SEARCH_LIST, { params })
      .then(response => {
        return fpGet('data', response)
      })

    return dispatch({
      payload,
      type: actionTypes.SEARCH_LIST
    })
  }
}

export const saveSearchAction = (data) => {
  return (dispatch, getState) => {
    const params = {
      get_query: queryToParams(data)
    }

    const payload = axios({ dispatch, getState })
      .post(API.SEARCH_HISTORY_CREATE, params)
      .then(fpGet('data'))

    return dispatch({
      payload: payload,
      type: actionTypes.SEARCH_HISTORY_CREATE
    })
  }
}
