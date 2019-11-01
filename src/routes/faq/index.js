/* eslint-disable func-style */
import React from 'react'
import Layout from 'components/Layout'
import FaqContainer from './FaqContainer'

function action (props) {
  const { store, isServer } = props
  return {
    title: 'F.A.Q.',
    component: (
      <Layout {...props} store={store}>
        <FaqContainer />
      </Layout>
    )
  }
}

export default action
