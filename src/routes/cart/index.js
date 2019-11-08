import React from 'react'
import Layout from 'components/Layout'
import CartContainer from './CartContainer'

async function action (props) {
  const { store, isServer } = props
  if (isServer) {
  }
  return {
    title: 'Корзина',
    component: (
      <Layout {...props} home={true}>
        <CartContainer />
      </Layout>
    )
  }
}

export default action
