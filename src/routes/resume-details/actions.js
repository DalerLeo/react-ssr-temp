import axios from 'helpers/axiosHelper'
import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import * as sprintf from 'sprintf'
import toSnakeCase from 'helpers/toSnakeCase'
import fp from 'lodash/fp'

export const resumeFetchItem = (id, isTemp) => {
  return (dispatch, getState) => {
    const params = {}
    const api = isTemp ? API.RESUME_ITEM : API.RESUME_ACTIVE_ITEM
    const payload = axios({ dispatch, getState })
      .get(sprintf(api, fp.toNumber(id)), { params })
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.RESUME_ITEM
    })
  }
}

export const resumeActiveList = (data) => {
  const params = toSnakeCase({
    pageSize: '100',
    ...data
  })
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.RESUME_ACTIVE_LIST, { params })
      .then(response => {
        return fp.get('data', response)
      })

    return dispatch({
      payload,
      type: actionTypes.RESUME_LIST
    })
  }
}
export const resumeCommentList = (data) => {
  const params = toSnakeCase({
    pageSize: '4',
    ...data
  })
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.EMPLOYER_RESUME_COMMENT, { params })
      .then(response => {
        return fp.get('data', response)
      })

    return dispatch({
      payload,
      type: actionTypes.COMMENT_LIST
    })
  }
}

export const resumeCommentCreate = (comment, resume) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.EMPLOYER_RESUME_COMMENT, { comment, resume })
      .then(response => {
        return fp.get('data', response)
      })

    return dispatch({
      payload,
      type: actionTypes.COMMENT_CREATE
    })
  }
}

export const resumeFavCreate = id => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(sprintf(API.RESUME_FAV_CREATE, Number(id)))
      .then(response => {
        return fp.get('data', response)
      })

    return dispatch({
      payload,
      type: actionTypes.RESUME_FAV_CREATE
    })
  }
}

export const resumeFavDelete = id => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .delete(sprintf(API.RESUME_FAV_CREATE, Number(id)))
      .then(response => {
        return fp.get('data', response)
      })

    return dispatch({
      payload,
      type: actionTypes.RESUME_FAV_CREATE
    })
  }
}

export const rateApplicantAction = (id, rate) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(sprintf(API.APPLICANT_RATE, id), { rate })
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.APPLICANT_RATE
    })
  }
}

export const getApplicantRate = (applicantId) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.APPLICANT_RATE, applicantId))
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.APPLICANT_RATE
    })
  }
}

export const sendInviteAction = (resume, message) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(sprintf(API.RESUME_INVITE, resume), { message })
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.RESUME_INVITE
    })
  }
}

export const downloadResumeAction = (resume, format, token) => {
  const params = { token }
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.RESUME_DOWNLOAD, resume, format), { params })
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.RESUME_DOWNLOAD
    })
  }
}
