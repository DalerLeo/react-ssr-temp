import fp from 'lodash/fp'
import sprintf from 'sprintf'
import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import axios from 'helpers/axiosHelper'
import toSnakeCase from 'helpers/toSnakeCase'
import toast from 'helpers/toast'
import { getCookieToken } from 'helpers/getCookieToken'

export const orderListFetch = params => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.ORDER_LIST, { params: toSnakeCase(params) })
      .then(fp.get('data'))

    return dispatch({
      type: actionTypes.ORDER_LIST,
      payload
    })
  }
}

export const orderItemFetch = id => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.ORDER_ITEM, id))
      .then(fp.get('data'))

    return dispatch({
      type: actionTypes.ORDER_ITEM,
      payload
    })
  }
}

export const orderCreateAction = servicesList => {
  const orderServices = fp.map(item => {
    const ONE = 1
    const id = fp.get('id', item) || item
    if (fp.isArray(id)) {
      return fp.map(service => ({
        amount: ONE,
        service
      }), id)
    }
    return {
      amount: fp.get('amount', item) || ONE,
      service: id
    }
  }, servicesList)
  const requestData = toSnakeCase({
    orderServices: fp.flatten(orderServices)
  })
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.ORDER_CREATE, requestData)
      .then(fp.get('data'))

    return dispatch({
      type: actionTypes.ORDER_CREATE,
      payload
    })
  }
}

export const orderMakePaymentAction = orderId => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(sprintf(API.ORDER_MAKE_PAYMENT, orderId))
      .then(fp.get('data'))

    return dispatch({
      type: actionTypes.ORDER_MAKE_PAYMENT,
      payload
    })
  }
}

export const orderActivateAction = (orderServices, params) => {
  const requestData = toSnakeCase({
    ...params,
    orderServices
  })
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(sprintf(API.ORDER_ACTIVATE), requestData)
      .then(fp.get('data'))

    return dispatch({
      type: actionTypes.ORDER_ACTIVATE,
      payload
    })
  }
}

export const orderRequestContractAction = orderId => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(sprintf(API.ORDER_REQUEST_CONTRACT, orderId))
      .then(fp.get('data'))

    return dispatch({
      type: actionTypes.ORDER_REQUEST_CONTRACT,
      payload
    })
  }
}

/*
*
*
* */

export const onOrderCreateAction = (props, list) => {
  const userEmail = fp.get(['userData', 'username'], props) ||
                    fp.get(['userData', 'email'], props)
  return props.orderCreateAction(list)
    .then(({ value }) => {
      props.clearCartAction(false, userEmail)
      toast({
        title: 'Заказ сформирован',
        message: 'Менеджер свяжется с вами в ближайшее время'
      })
      return props.orderMakePaymentAction(value.id)
        .then(() => {
          toast({
            title: 'Оплачено',
            message: 'Ваш заказ активен'
          })
          props.userInfoFetch && props.userInfoFetch(getCookieToken(document.cookie))
        })
    })
}
