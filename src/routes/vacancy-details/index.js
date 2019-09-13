/* eslint-disable func-style */
import React from 'react'
import loToInteger from 'lodash/toInteger'
import { getServerTitle } from 'helpers/dom'
import { vacancyFetchItem } from './actions'
import VacancyDetailContainer from './VacancyDetailContainer'
import Layout from 'components/Layout'

async function action (props) {
  const { store, isServer, params } = props
  const id = loToInteger(params.id)
  return {
    chunks: ['vacancy-details'],
    title: await getServerTitle({
      id,
      store,
      isServer,
      action: vacancyFetchItem,
      defaultText: 'Просмотр вакансии'
    }),
    component: (
      <Layout store={store} {...props}>
        <VacancyDetailContainer id={id} isServer={isServer}/>
      </Layout>
    )
  }
}

export default action
