import * as STATE from 'constants/stateNames'
import React from 'react'
import useFetchList from '../../hooks/useFetchList'
import MyOrder from './MyOrder'
import { myOrderListAction } from './actions'

const MyOrderContainer = props => {
  const myOrderList = useFetchList({
    action: myOrderListAction,
    stateName: STATE.ORDER_LIST
  })

  return <MyOrder myOrderList={myOrderList} />
}

export default MyOrderContainer
