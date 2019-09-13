/* eslint-disable func-style */
import React from 'react'
import ArticleDetailContainer from './EventDetailContainer'
import Layout from 'components/Layout'
import loToInteger from 'lodash/toInteger'

async function action (props) {
  const { store, isServer, params } = props
  return {
    title: 'Статья',
    component: (
      <Layout store={store}>
        <ArticleDetailContainer id={loToInteger(params.id)}/>
      </Layout>
    )
  }
}

export default action
