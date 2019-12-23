import * as STATE from 'constants/stateNames'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataFromState } from 'utils/get'
import Order from './Order'
import { orderCreateAction } from './actions'

const data = [
  {
    id: '0',
    name: 'Бесплатная доставка',
    info: 'Стандартная бесплатная доставка в течении 2х дней.'
  },
  {
    id: '1',
    name: 'Сверхсрочная доставка',
    info: 'Ну очень быстрая доставка. Доставит сам Флэш.',
    price: '22000'
  }
]

const paymentTypes = [
  {
    id: 'cash',
    name: 'Оплата при получении',
    info: 'Вам позвонит оператор для подтверждения заказа'
  },
  {
    id: 'payme',
    name: 'Uzcard',
    info: 'Универсальная система оплаты через интерфейс Payme'
  }
]
const EMPTY_ARR = []

const OrderContainer = props => {
  const dispatch = useDispatch()

  const { data: products } = useSelector(getDataFromState(STATE.CART))
  const addresses = useSelector(getDataFromState(STATE.ADDRESS_LIST))

  const onSubmit = (values) => {
    dispatch(orderCreateAction(values, products))
  }
  return (
    <Order
      data={data}
      addresses={addresses}
      paymentTypes={paymentTypes}
      onSubmit={onSubmit}
    />
  )
}

export default OrderContainer
