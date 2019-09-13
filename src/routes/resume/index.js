/* eslint-disable func-style */
import React from 'react'
import Layout from 'components/Layout'
import ResumeContainer from './ResumeContainer'
import {
  getProfessionsList,
  getRegionsList
} from './actions'

async function action (props) {
  const { store, isServer } = props

  if (isServer) {
    //    Await store.dispatch(getProfessionsList())
    //    Await store.dispatch(getRegionsList())
  }
  return {
    chunks: ['resume'],
    title: 'Результаты поиска',
    component: (
      <Layout search={true} store={store}>
        <ResumeContainer/>
      </Layout>
    )
  }
}

export default action
