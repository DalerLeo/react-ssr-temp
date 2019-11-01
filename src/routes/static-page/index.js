/* eslint-disable func-style */
import React from 'react'
import Layout from '../../components/Layout'
import StaticPageContainer from './StaticPageContainer'

async function action (props) {
  const { store, isServer, params } = props
  return {
    title: 'Статичная страница',
    component: (
      <Layout {...props} store={store}>
        <StaticPageContainer params={params} />
      </Layout>
    )
  }
}

export default action
