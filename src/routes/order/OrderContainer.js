import * as STATE from 'constants/stateNames'
import * as ROUTE from 'constants/routes'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataFromState } from 'utils/get'
import PaymeIcon from 'icons/Payme.svg'
import CashIcon from 'icons/Cash.svg'
import useHistory from 'hooks/useHistory'
import { sprintf } from 'sprintf-js'
import equals from 'fast-deep-equal'
import { pathOr } from 'ramda'
import Order from './Order'
import { orderCreateAction } from './actions'

const data = [
  {
    id: '0',
    name: 'Бесплатная доставка',
    info: 'Стандартная бесплатная доставка в течении 2х дней.',
    price: '',
    icon: ''
  },
  {
    id: '1',
    name: 'Сверхсрочная доставка',
    info: 'Ну очень быстрая доставка. Доставит сам Флэш.',
    price: 22000,
    icon: ''
  }
]

const paymentTypes = [
  {
    id: 'payme',
    name: '',
    info: 'Онлайн оплата через Payme',
    icon: PaymeIcon
  },
  {
    id: 'cash',
    name: '',
    info: 'Оплата при получении',
    icon: CashIcon
  }
]

const EMPTY_ARR = []

const OrderContainer = props => {
  const dispatch = useDispatch()

  const { data: products } = useSelector(getDataFromState(STATE.CART))
  const addresses = useSelector(getDataFromState(STATE.ADDRESS_LIST))
  const cartList = useSelector(getDataFromState(STATE.CART), equals)

  const cartProducts = pathOr(EMPTY_ARR, ['data'], cartList)

  const history = useHistory()

  const onSubmit = (values) => {
    dispatch(orderCreateAction(values, products))
      .then(({ value }) =>
        history.replace(sprintf(ROUTE.ORDER_DETAIL_URL, value.id)))
  }
  return (
    <Order
      data={data}
      addresses={addresses}
      paymentTypes={paymentTypes}
      onSubmit={onSubmit}
      products={cartProducts}
    />
  )
}

export default OrderContainer
