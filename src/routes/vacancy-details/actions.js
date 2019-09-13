import fp from 'lodash/fp'
import map from 'lodash/map'
import axios from 'helpers/axiosHelper'
import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import * as sprintf from 'sprintf'
import toSnakeCase from 'helpers/toSnakeCase'
import caughtCancel from 'helpers/caughtCancel'

export const vacancyFetchItem = (id) => {
  return (dispatch, getState) => {
    const params = {}
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.VACANCY_APPROVED_ITEM, fp.toNumber(id)), { params })
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.VACANCY_APPROVED_ITEM
    })
  }
}

export const vacancyAppealCreate = (vacancy, data, quests) => {
  const resume = fp.get('resume', data)
  const questions = map(fp.get('answers', data), (ans, i) => {
    const type = quests[i].type
    const answers = type === 'choices' ? ans : 'None'
    const freeAnswers = type === 'open' ? ans : 'None'
    return {
      question: quests[i].id,
      answer: answers,
      freeAnswer: freeAnswers
    }
  })
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.VACANCY_APPEAL_CREATE, toSnakeCase({ resume, questions, vacancy }))
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.VACANCY_APPEAL_CREATE
    })
  }
}

export const vacancyFavCreate = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(sprintf(API.VACANCY_FAV_CREATE, Number(id)))
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.VACANCY_FAV_CREATE
    })
  }
}

export const vacancyFavDelete = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .delete(sprintf(API.VACANCY_FAV_CREATE, Number(id)))
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.VACANCY_FAV_CREATE
    })
  }
}

export const vacancyActivateAction = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(sprintf(API.VACANCY_ACTIVATE, id))
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.VACANCY_ACTIVATE
    })
  }
}

export const vacancyDeactivateAction = (id, message) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(sprintf(API.VACANCY_DEACTIVATE, id), { message })
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.VACANCY_DEACTIVATE
    })
  }
}
