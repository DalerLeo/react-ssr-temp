/* eslint-disable func-style */
import React from 'react'
import Layout from 'components/Layout'
import HomeContainer from './HomeContainer'

async function action (props) {
  const { store, isServer } = props
  if (isServer) {
  }
  return {
    title: 'Главная',
    component: (
      <Layout {...props} home={true}>
        <HomeContainer />
      </Layout>
    )
  }
}

export default action
