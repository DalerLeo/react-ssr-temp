import React from 'react'
import Layout from 'components/Layout'
import OrderDetailContainer from './OrderDetailContainer'
import { orderDetailAction } from './actions'

async function action (props) {
  const { store, isServer, params } = props
  const id = Number(params.id)
  await store.dispatch(orderDetailAction(id))
  if (isServer) {
  }

  return {
    title: 'Заказ - Detail',
    component: (
      <Layout {...props}>
        <OrderDetailContainer id={id} />
      </Layout>
    )
  }
}

export default action
