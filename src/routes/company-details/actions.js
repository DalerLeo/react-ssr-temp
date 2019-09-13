
import fp from 'lodash/fp'
import axios from 'helpers/axiosHelper'
import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import * as sprintf from 'sprintf'

export const employerFetchItem = (id) => {
  return (dispatch, getState) => {
    const params = {
    }
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.EMPLOYER_ITEM_APPROVED, fp.toNumber(id)), { params })
      .then(response => {
        return fp.get('data', response)
      })

    return dispatch({
      payload,
      type: actionTypes.EMPLOYER_ITEM
    })
  }
}

export const employerAppealCreateAction = (requestData) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.EMPLOYER_APPEAL_CREATE, requestData)
      .then(response => {
        return fp.get('data', response)
      })

    return dispatch({
      payload,
      type: actionTypes.EMPLOYER_APPEAL_CREATE
    })
  }
}

export const toggleFavoriteEmployerAction = (employer, isFavorite) => {
  return (dispatch, getState) => {
    const payload = (isFavorite
      ? axios({ dispatch, getState })
        .post(sprintf(API.EMPLOYER_FAVORITE, employer))
      : axios({ dispatch, getState })
        .delete(sprintf(API.EMPLOYER_FAVORITE, employer)))
      .then(fp.get('data'))
    return dispatch({
      payload,
      type: actionTypes.EMPLOYER_FAVORITE
    })
  }
}
