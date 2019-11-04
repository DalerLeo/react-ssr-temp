import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import fpGet from 'lodash/fp/get'
import axios from 'utils/ax'

export const articleListFetch = (data) => {
  return (dispatch, getState) => {
    const params = {
      page_size: fpGet('pageSize', data) || '8',
      page: fpGet('page', data)
    }
    const payload = axios({ dispatch, getState })
      .get(API.ARTICLE_LIST, { params })
      .then(fpGet('data'))

    return dispatch({
      payload,
      type: actionTypes.ARTICLE_LIST
    })
  }
}
