import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import _ from 'lodash'
import axios from 'helpers/axiosHelper'
import sprintf from 'sprintf'

export const articleItemFetch = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.ARTICLE_ITEM, Number(id)))
      .then(response => {
        return _.get(response, 'data')
      })

    return dispatch({
      payload,
      type: actionTypes.ARTICLE_ITEM
    })
  }
}
