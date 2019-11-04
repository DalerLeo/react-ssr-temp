/* eslint-disable func-style */
import React from 'react'
import Layout from 'components/Layout'
import ResultsContainer from './ResultsContainer'

async function action (props) {
  const { store, isServer } = props
  if (isServer) {
    //    Await store.dispatch(getProfessionsList())
    //    Await store.dispatch(getRegionsList())
  }
  return {
    title: 'Результаты поиска',
    component: (
      <Layout search={true} {...props} store={store}>
        <ResultsContainer />
      </Layout>
    )
  }
}

export default action
