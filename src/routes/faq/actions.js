import fp from 'lodash/fp'
import axios from 'helpers/axiosHelper'
import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'

export const getFaqList = () => {
  return (dispatch, getState) => {
    const params = { page_size: 100 }
    const payload = axios({ dispatch, getState })
      .get(API.FAQ_LIST, { params })
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.FAQ_LIST
    })
  }
}
