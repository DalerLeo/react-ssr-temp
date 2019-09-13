import React from 'react'
import Layout from 'components/Layout'
import SearchPage from './SearchPage'

const action = (props) => {
  return {
    chunks: ['search'],
    title: 'Расширенный поиск',
    component: (
      <Layout {...props} search={true}>
        <SearchPage/>
      </Layout>
    )
  }
}

export default action
