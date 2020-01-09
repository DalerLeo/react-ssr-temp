import * as actionTypes from 'constants/actionTypes'
import { path, map, prop } from 'ramda'
import axios from '../../utils/axios'
import * as API from '../../constants/api'
import toSnakeCase from '../../utils/toSnakeCase'

const getProduct = product => ({
  product: prop('id', product),
  amount: prop('amount', product)
})
export const orderCreateAction = (data, products) => {
  return (dispatch, getState) => {
    const requestData = {
      address: toSnakeCase(path(['address'], data)),
      deal_type: path(['dealType', 'id'], data),
      payment_type: path(['paymentType', 'id'], data),
      order_products: map(getProduct, products)
    }

    const payload = axios({ dispatch, getState })
      .post(API.ORDER_CREATE, requestData)
      .then(response => {
        return path(['data'], response)
      })

    return dispatch({
      payload,
      type: actionTypes.ORDER_CREATE,
    })
  }
}

export const addressListAction = (data, type) => {
  return (dispatch, getState) => {
    const params = {
      page_size: 150
    }
    const payload = axios({ dispatch, getState })
      .get(API.ADDRESS_LIST, { params })
      .then(response => {
        return path(['data', 'results'], response)
      })
    return dispatch({
      payload,
      type: actionTypes.ADDRESS_LIST
    })
  }
}
