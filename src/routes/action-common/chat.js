import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import axios from 'helpers/axiosHelper'
import fp from 'lodash/fp'

export const getChatList = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.FRONT_CHAT_LIST)
      .then(fp.get('data'))

    return dispatch({
      type: actionTypes.FRONT_CHAT_LIST,
      payload
    })
  }
}
