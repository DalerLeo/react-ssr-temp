/* eslint-disable func-style */
import React from 'react'
import Layout from 'components/Layout'
import ArticlesContainer from './ArticlesContainer'
import { articleListFetch } from './actions'

async function action (props) {
  const { store, isServer } = props
  if (isServer) {
    await store.dispatch(articleListFetch())
  }
  return {
    chunks: ['articles'],
    title: 'Статьи',
    component: (
      <Layout {...props} store={store}>
        <ArticlesContainer />
      </Layout>
    )
  }
}

export default action
