import fp from 'lodash/fp'
import sprintf from 'sprintf'
import axios from 'helpers/axiosHelper'
import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'

export const getStaticPagesList = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.STATIC_PAGES)
      .then(fp.get('data'))
    return dispatch({
      payload,
      type: actionTypes.STATIC_PAGES
    })
  }
}

export const getStaticPageItem = (keyname) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.STATIC_PAGES_ITEM, keyname))
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.STATIC_PAGES_ITEM
    })
  }
}
