/* eslint-disable func-style */
import React from 'react'
import fpGet from 'lodash/fp/get'
import VacancyCreateContainer from './VacancyCreateContainer'
import Layout from 'components/Layout'
import { vacancyFetchItem } from './actions'

async function action (props) {
  const { store, isServer, params } = props
  const actionName = fpGet('actionName', params)

  const titles = {
    'edit': 'Редактирование вакансии',
    'view': 'Просмотр вакансии',
    'undefined': 'Создание вакансии'
  }

  if (isServer && params.id) {
    await store.dispatch(vacancyFetchItem(params.id))
  }
  return {
    chunks: ['vacancy-create'],
    title: fpGet(actionName, titles),
    component: (
      <Layout {...props} store={store} simple={true}>
        <VacancyCreateContainer {...params}/>
      </Layout>
    )
  }
}

export default action
