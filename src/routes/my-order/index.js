import React from 'react'
import Layout from 'components/Layout'
import MyOrderContainer from './MyOrderContainer'

async function action (props) {
  const { store, isServer } = props
  if (isServer) {

  }
  return {
    title: 'Заказ',
    component: (
      <Layout {...props}>
        <MyOrderContainer />
      </Layout>
    )
  }
}

export default action
