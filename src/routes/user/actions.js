import fp from 'lodash/fp'
import axios from 'helpers/axiosHelper'
import toSnakeCase from 'helpers/toSnakeCase'
import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import setCookie from 'helpers/setCookie'
import { getStateToken } from 'helpers/getCookieToken'
import sprintf from 'sprintf'
import caughtCancel from 'helpers/caughtCancel'

export const getProfessionsList = () => {
  return (dispatch, getState) => {
    const params = {
      page_size: 100,
      only_parent: true,
      ordering: 'name'
    }
    const payload = axios({ dispatch, getState })
      .get(API.PROFESSIONS_LIST, { params })
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.PROFESSIONS_LIST
    })
  }
}

export const getEmployerList = (filter) => {
  const data = filter.getParams()
  return (dispatch, getState) => {
    const params = {
      page_size: 10,
      type: 'employer',
      ...data
    }

    const payload = axios({ dispatch, getState })
      .get(API.EMPLOYER_LIST, { params })
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload: payload,
      type: actionTypes.EMPLOYER_LIST
    })
  }
}

export const getRegionsList = () => {
  return (dispatch, getState) => {
    const params = {
      page_size: 100,
      ordering: 'name'
    }
    const payload = axios({ dispatch, getState })
      .get(API.REGIONS_LIST, { params })
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.REGIONS_LIST
    })
  }
}

export const loginAction = data => {
  const remember = fp.get('remember', data)
  const params = {
    username: fp.get('username', data),
    password: fp.get('password', data)
  }
  const ONE_DAY = 1
  const ONE_YEAR = 365

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.LOGIN, params)
      .then(response => {
        const resp = fp.get('data', response)
        const token = fp.get('token', resp)
        setCookie('token', token, remember ? ONE_YEAR : ONE_DAY)
        return resp
      })
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.LOGIN
    })
  }
}

export const logoutAction = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .delete(API.LOGOUT)
      .then(fp.get('data'))
      .catch(caughtCancel)

    setCookie('token', '')
    dispatch({ type: `${actionTypes.USER_INFO}_CLEAR` })
    dispatch({ type: `${actionTypes.LOGIN}_CLEAR` })
    return dispatch({
      payload,
      type: `${actionTypes.LOGIN}`
    })
  }
}

export const userInfoFetch = token => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(`${API.CHECK_TOKEN}${token}/`)
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.USER_INFO
    })
  }
}

export const userInfoWithTokenFetch = () => {
  return (dispatch, getState) => {
    const token = getStateToken(getState())
    const payload = axios({ dispatch, getState })
      .get(`${API.CHECK_TOKEN}${token}/`)
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.USER_INFO
    })
  }
}

export const userActivateAction = (id, token) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.USER_ACTIVATION, id, token))
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.USER_ACTIVATION
    })
  }
}

export const resumeActivate = id => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(sprintf(API.RESUME_ITEM_ACTIVATE, id))
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.RESUME_ACTIVATE
    })
  }
}
export const userResetPassword = username => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.USER_RESET_PASSWORD, { username })
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.USER_RESET_PASSWORD
    })
  }
}

export const resumeDeactivate = id => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(sprintf(API.RESUME_ITEM_DEACTIVATE, id))
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.RESUME_DEACTIVATE
    })
  }
}

export const resumeUpdate = id => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(sprintf(API.RESUME_ITEM_UPDATE_DATE, id))
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.RESUME_ITEM_UPDATE_DATE
    })
  }
}

export const fetchResumeList = (data) => {
  const params = toSnakeCase({
    ...data,
    pageSize: 100
  })
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.RESUME_LIST, { params })
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.RESUME_LIST
    })
  }
}

export const fetchItemGuestList = (id) => {
  const params = toSnakeCase({
    pageSize: '10'
  })
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.RESUME_ITEM_GUESTS, Number(id)), { params })
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.RESUME_ITEM_GUESTS
    })
  }
}
export const getApplicantGuests = () => {
  const params = toSnakeCase({
    pageSize: '10'
  })
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.RESUME_GUESTS, { params })
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.RESUME_ITEM_GUESTS
    })
  }
}

export const fetchSearchHistory = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.SEARCH_HISTORY_LIST)
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.SEARCH_HISTORY
    })
  }
}

export const fetchFavVacancies = () => {
  const params = { page_size: 100 }
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.APPLICANT_FAV_VACANCY_LIST, { params })
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.APPLICANT_FAV_VACANCY_LIST
    })
  }
}

export const fetchFavEmployers = () => {
  const params = { page_size: 100 }
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.APPLICANT_FAV_EMPLOYERS_LIST, { params })
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.APPLICANT_FAV_EMPLOYERS_LIST
    })
  }
}

export const fetchAppealedVacancies = (params) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.VACANCY_APPEALED_LIST, { params })
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.VACANCY_APPEALED_LIST
    })
  }
}

export const fetchVacancyAppealedResumes = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.VACANCY_APPEALED_ITEM, id))
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.VACANCY_APPEALED_ITEM
    })
  }
}
export const vacancyAppealedResumesCount = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.VACANCY_APPEALED_ITEM_COUNT, id))
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.VACANCY_APPEALED_ITEM_COUNT
    })
  }
}

export const vacancyAppealedResumeChangeStatus = (id, data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(sprintf(API.VACANCY_APPEALED_ITEM_STATUS_CHANGE, id), data)
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.VACANCY_APPEALED_ITEM_STATUS_CHANGE
    })
  }
}

export const employerStatGeneralFetch = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.STAT_EMPLOYER_GENERAL)
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.STAT_EMPLOYER_GENERAL
    })
  }
}
export const employerStatViewsFetch = (params) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.STAT_EMPLOYER_VIEWS, toSnakeCase({ params }))
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.STAT_EMPLOYER_VIEWS
    })
  }
}
export const employerVacancyStatViewsFetch = (params) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.STAT_EMPLOYER_VACANCY_VIEWS, toSnakeCase({ params }))
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.STAT_EMPLOYER_VACANCY_VIEWS
    })
  }
}

export const vacancyListFetch = (params) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.VACANCY_LIST, { params })
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload: payload,
      type: actionTypes.VACANCY_APPROVED_LIST
    })
  }
}

export const vacancyItemViewHistory = vacancy => {
  const params = toSnakeCase({
    contentType: 'vacancy',
    objectId: vacancy,
    action: 'retrieve',
    group: true
  })
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.VACANCY_ITEM_VIEW_HISTORY, { params })
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload: payload,
      type: actionTypes.VACANCY_ITEM_VIEW_HISTORY
    })
  }
}

// EMPLOYER STAFF
export const employerStaffListFetch = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.EMPLOYER_STAFF_LIST)
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload: payload,
      type: actionTypes.EMPLOYER_STAFF_LIST
    })
  }
}

export const employerStaffCreateAction = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.EMPLOYER_STAFF_CREATE)
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload: payload,
      type: actionTypes.EMPLOYER_STAFF_CREATE
    })
  }
}

export const employerStaffDeleteAction = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .delete(sprintf(API.EMPLOYER_STAFF_DELETE, id))
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload: payload,
      type: actionTypes.EMPLOYER_STAFF_DELETE
    })
  }
}

// SERVICES
export const userActiveServicesList = params => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.USER_ACTIVE_SERVICES, { params: toSnakeCase(params) })
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.USER_ACTIVE_SERVICES
    })
  }
}

export const fetchAppealedCompanies = (params) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.EMPLOYER_APPEAL_CHAT, { params: toSnakeCase({
        pageSize: 100,
        ...params
      }) })
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.EMPLOYER_APPEAL_CHAT
    })
  }
}

export const getEmployerChatId = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.EMPLOYER_MANAGER_CHAT)
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.EMPLOYER_MANAGER_CHAT
    })
  }
}

export const getChatMessages = (chatId, params) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.CHAT_MESSAGES, chatId), { params: toSnakeCase({
        pageSize: 20,
        ...params
      }) })
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.CHAT_MESSAGES
    })
  }
}

export const getEmployerGuests = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.EMPLOYER_GUESTS)
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.EMPLOYER_GUESTS
    })
  }
}

export const getSuitableResumes = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.RESUME_SUITABLE_LIST)
      .then(fp.get('data'))
      .catch(caughtCancel)

    return dispatch({
      payload,
      type: actionTypes.RESUME_SUITABLE_LIST
    })
  }
}
