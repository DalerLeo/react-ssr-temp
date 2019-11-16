import React from 'react'
import Layout from 'components/Layout'
import DeliveryContainer from './DeliveryContainer'

async function action (props) {
  const { store, isServer } = props
  if (isServer) {

  }
  return {
    chunk: ['delivery'],
    title: 'Доставка',
    component: (
      <Layout {...props}>
        <DeliveryContainer />
      </Layout>
    )
  }
}

export default action
