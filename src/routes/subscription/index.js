/* eslint-disable func-style */
import React from 'react'
import Layout from 'components/Layout'
import SubscriptionContainer from './SubscriptionContainer'

function action (props) {
  const { store, isServer } = props
  return {
    title: 'Мои подписки',
    component: (
      <Layout {...props} store={store}>
        <SubscriptionContainer/>
      </Layout>
    )
  }
}

export default action
