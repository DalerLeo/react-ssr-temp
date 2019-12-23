import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import { path } from 'ramda'
import axios from 'utils/axios'
import { sprintf } from 'sprintf-js'


export const addressListAction = (data, type) => {
  return (dispatch, getState) => {
    const params = {
      page_size: 150
    }
    const payload = axios({ dispatch, getState })
      .get(API.ADDRESS_LIST, { params })
      .then(response => {
        return path(['data', 'results'], response)
      })
    return dispatch({
      payload,
      type: actionTypes.ADDRESS_LIST
    })
  }
}

export const addressCreateAction = (data) => {
  return (dispatch, getState) => {
    const params = {
      location: {
        lat: 41.2978462,
        lon: 69.27365476
      },
      address: path(['location'], data),
      phone: path(['phoneNumber'], data),
      contact_person: path(['name'], data),
      //      Contact_person: contact_phone
    }
    const payload = axios({ dispatch, getState })
      .post(API.ADDRESS_CREATE, params)
      .then(response => {
        return path(['data'], response)
      })

    return dispatch({
      payload,
      type: actionTypes.ADDRESS_CREATE
    })
  }
}

export const addressDeleteAction = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .delete(sprintf(API.ADDRESS_DELETE, id))
      .then(response => {
        return path('data', response)
      })

    return dispatch({
      payload,
      type: actionTypes.ADDRESS_DELETE
    })
  }
}
