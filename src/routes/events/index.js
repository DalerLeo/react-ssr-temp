/* eslint-disable func-style */
import React from 'react'
import ArticlesContainer from './EventsContainer'
import Layout from 'components/Layout'
import {
  getProfessionsList,
  getRegionsList
} from './actions'

async function action (props) {
  const { store, isServer } = props
  if (isServer) {
    //        Await store.dispatch(getProfessionsList())
    //        Await store.dispatch(getRegionsList())
  }
  return {
    title: 'Главная',
    component: (
      <Layout store={store}>
        <ArticlesContainer/>
      </Layout>
    )
  }
}

export default action
