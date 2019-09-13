/* eslint-disable func-style */
import React from 'react'
import HomeContainer from './HomeContainer'
import Layout from 'components/Layout'
import {
  getProfessionsList,
  getRegionsList,
  getVacancyList,
  getEmployerList,
  fetchPopularVacancyList
} from './actions'

async function action (props) {
  const { store, isServer } = props
  if (isServer) {
    await store.dispatch(getProfessionsList())
    await store.dispatch(getRegionsList('region'))
    await store.dispatch(getVacancyList())
    await store.dispatch(getEmployerList())
    await store.dispatch(fetchPopularVacancyList())
  }
  return {
    title: 'Главная',
    component: (
      <Layout {...props} home={true}>
        <HomeContainer/>
      </Layout>
    )
  }
}

export default action
