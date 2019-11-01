/* eslint-disable func-style */
import React from 'react'
import Layout from '../../components/Layout'
import ArticlesContainer from './ArticlesContainer'

async function action (props) {
  const { store, isServer } = props
  if (isServer) {

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
