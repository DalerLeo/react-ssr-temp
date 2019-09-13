import fp from 'lodash/fp'
import sprintf from 'sprintf'
import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import axios from 'helpers/axiosHelper'
import { getCookieToken } from 'helpers/getCookieToken'
import toast from 'helpers/toast'
import toSnakeCase from 'helpers/toSnakeCase'

export const getVacancyServicesDiscounts = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.VACNACY_SERVICE_DISCOUNTS)
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.VACNACY_SERVICE_DISCOUNTS
    })
  }
}

export const getApplicantServicesList = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.APPLICANT_SERVICE_LIST)
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.APPLICANT_SERVICE_LIST
    })
  }
}

export const getEmployerServicesList = () => {
  return (dispatch, getState) => {
    const params = {}
    const payload = axios({ dispatch, getState })
      .get(API.EMPLOYER_SERVICE_LIST, { params })
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.EMPLOYER_SERVICE_LIST
    })
  }
}

export const getDatabaseAccessList = () => {
  return (dispatch, getState) => {
    const params = {}
    const payload = axios({ dispatch, getState })
      .get(API.DATABASE_ACCESS_LIST, { params })
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.DATABASE_ACCESS_LIST
    })
  }
}
export const getDatabaseAccessItem = spheres => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.DATABASE_ACCESS_ITEM, spheres))
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.DATABASE_ACCESS_ITEM
    })
  }
}

export const getVipPacketList = () => {
  return (dispatch, getState) => {
    const params = {}
    const payload = axios({ dispatch, getState })
      .get(API.VIP_PACKET_LIST, { params })
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.VIP_PACKET_LIST
    })
  }
}

export const fillingBalanceAction = (paymentType, amount) => {
  const requestData = toSnakeCase({
    paymentType,
    amount
  })
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.FILL_BALANCE, requestData)
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.FILL_BALANCE
    })
  }
}

export const activateServicesAction = (codes, params) => {
  // ...params are (vacancy or resume IDs)
  const requestData = {
    services: codes,
    ...params
  }
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.SERVICES_ACTIVATE, requestData)
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.SERVICES_ACTIVATE
    })
  }
}

export const getServicesMinPrices = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.SERVICES_MIN_PRICES)
      .then(fp.get('data'))

    return dispatch({
      payload,
      type: actionTypes.SERVICES_MIN_PRICES
    })
  }
}

export const promoteApplicantResumeAction = ({ props, services, resume, callBack }) => {
  const servicesIds = fp.map(fp.get('id'), services)
  const servicesCodes = fp.map(fp.get('code'), services)
  props.orderCreateAction(servicesIds)
    .then(({ value }) => {
      const orderId = fp.get('id', value)
      props.orderMakePaymentAction(orderId)
        .then(() => {
          props.userInfoFetch(getCookieToken(document.cookie))
          toast({
            title: 'Оплачено',
            message: 'Ваш заказ активен'
          })
          props.activateServicesAction(servicesCodes, { resume })
            .then(() => {
              callBack()
              toast({
                title: 'Применено',
                message: 'Услуги были применены к резюме'
              })
            })
            .catch(() => {
              toast({
                title: 'Ошибка',
                message: 'Услуги уже применены к резюме',
                type: 'error'
              })
            })
        })
    })
}
