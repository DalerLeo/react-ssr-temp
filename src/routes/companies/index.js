/* eslint-disable func-style */
import React from 'react'
import CompaniesContainer from './CompaniesContainer'
import Layout from 'components/Layout'
import {
  getProfessionsList,
  getRegionsList
} from './actions'

async function action ({ store, isServer, ...props }) {
  if (isServer) {
    //        Await store.dispatch(getProfessionsList())
    //        Await store.dispatch(getRegionsList())
  }
  return {
    title: 'Главная',
    component: (
      <Layout store={store}>
        <CompaniesContainer/>
      </Layout>
    )
  }
}

export default action
