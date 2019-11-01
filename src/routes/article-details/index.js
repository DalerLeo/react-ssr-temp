/* eslint-disable func-style */
import React from 'react'
import loToInteger from 'lodash/toInteger'
import { getServerTitle } from 'helpers/dom'
import Layout from 'components/Layout'
import { articleItemFetch } from './actions'
import ArticleDetailContainer from './ArticleDetailContainer'

async function action (props) {
  const { store, isServer, params } = props
  const id = loToInteger(params.id)
  return {
    chunks: ['article-details'],
    title: await getServerTitle({
      id,
      store,
      isServer,
      action: articleItemFetch,
      defaultText: 'Статья'
    }),
    component: (
      <Layout {...props} store={store}>
        <ArticleDetailContainer id={id} isServer={isServer} />
      </Layout>
    )
  }
}

export default action
