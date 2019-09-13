/* eslint-disable func-style */
import React from 'react'
import loToInteger from 'lodash/toInteger'
import { getServerTitle } from 'helpers/dom'
import { employerFetchItem } from './actions'
import Layout from 'components/Layout'
import VacancyDetailContainer from './CompanyDetailContainer'

async function action (props) {
  const { store, isServer, params } = props

  const id = loToInteger(params.id)
  return {
    chunks: ['vacancy-details'],
    title: await getServerTitle({
      id,
      isServer,
      action: employerFetchItem,
      store,
      defaultText: 'Просмотр компании'
    }),
    component: (
      <Layout store={store} {...props}>
        <VacancyDetailContainer id={id} isServer={isServer}/>
      </Layout>
    )
  }
}

export default action
