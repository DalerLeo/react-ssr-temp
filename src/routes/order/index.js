import React from 'react'
import Layout from 'components/Layout'
import OrderContainer from './OrderContainer'
import {addressListAction} from './actions'
async function action (props) {
  const { store, isServer } = props
  if (isServer) {
  }

  store.dispatch(addressListAction())
  return {
    chunk: ['order'],
    title: 'Корзина',
    component: (
      <Layout {...props}>
        <OrderContainer />
      </Layout>
    )
  }
}

export default action
