import * as STATE from 'constants/stateNames'
import React from 'react'
import { useSelector } from 'react-redux'
import { getDataFromState } from '../../utils/get'
import OrderDetail from './OrderDetail'

const MyOrderContainer = props => {
  const orderData = useSelector(getDataFromState(STATE.ORDER_ITEM))

  return <OrderDetail {...orderData} />
}

export default MyOrderContainer
