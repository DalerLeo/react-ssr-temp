import _ from 'lodash'
import axios from 'helpers/axiosHelper'
import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'

export const getProfessionsList = () => {
  return (dispatch, getState) => {
    const params = {
      page_size: 100,
      only_parent: true,
      ordering: 'name'
    }
    const payload = axios({ dispatch, getState })
      .get(API.PROFESSIONS_LIST, { params })
      .then(response => {
        return _.get(response, 'data')
      })

    return dispatch({
      payload: payload,
      type: actionTypes.PROFESSIONS_LIST
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
      .then(response => {
        return _.get(response, 'data')
      })

    return dispatch({
      payload: payload,
      type: actionTypes.REGIONS_LIST
    })
  }
}

export const resumeFavListFetch = (param) => {
  return (dispatch, getState) => {
    const params = {
      page_size: 100,
      ordering: 'name',
      ...param
    }
    const payload = axios({ dispatch, getState })
      .get(API.RESUME_FAV_LIST, { params })
      .then(response => {
        return _.get(response, 'data')
      })

    return dispatch({
      payload: payload,
      type: actionTypes.RESUME_FAV_LIST
    })
  }
}
