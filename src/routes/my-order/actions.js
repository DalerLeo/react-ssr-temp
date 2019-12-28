import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import { path } from 'ramda'
import axios from 'utils/axios'

export const myOrderListAction = (data, type) => {
  return (dispatch, getState) => {
    const params = {
      page_size: 150
    }
    const payload = axios({ dispatch, getState })
      .get(API.ORDER_LIST, { params })
      .then(response => {
        return path(['data', 'results'], response)
      })
    return dispatch({
      payload,
      type: actionTypes.ORDER_LIST
    })
  }
}
