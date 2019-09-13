import React from 'react'
import Layout from 'components/Layout'
import NotFound from './NotFound'

export default props => {
  return {
    chunks: ['not-found'],
    title: 'Страница не найдена',
    component: (
      <Layout {...props}>
        <NotFound/>
      </Layout>
    ),
    status: 404
  }
}
