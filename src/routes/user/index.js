/* eslint-disable func-style */
import React from 'react'
import ApplicantContainer from './ApplicantContainer'
import EmployerContainer from './EmployerContainer'
import { getStateToken } from 'helpers/getCookieToken'
import Layout from 'components/Layout'
import fp from 'lodash/fp'

const URL_TYPE = 2

const getTitle = (url, isEmployer) => {
  if (isEmployer) {
    switch (url) {
      case 'stats': return 'Статистика'
      case 'vacancy': return 'Мои вакансии'
      case 'vip': return 'VIP комната'
      case 'fav': return 'Избранные резюме'
      case 'guest': return 'Гости'
      case 'history': return 'Поисковые заросы'
      case 'service': return 'Услуги'
      case 'orders': return 'Мои заказы'
      case 'employer-staff': return 'Сотрудники'
      default: return 'ПК работодателя'
    }
  }
  switch (url) {
    case 'resume': return 'Мои резюме'
    case 'feedback': return 'Отклики'
    case 'vip': return 'VIP комната'
    case 'fav': return 'Избранные вакансии'
    case 'guest': return 'Просмотры'
    case 'history': return 'История поиска'
    default: return 'ПК соискателя'
  }
}

function action (props) {
  const { store, params } = props
  const isEmployer = fp.flow(
    fp.get('pathname'),
    fp.split('/'),
    (item) => item[URL_TYPE],
    fp.isEqual('employer')
  )(props)

  if (!getStateToken(store.getState())) {
    return { redirect: '/' }
  }

  const title = getTitle(fp.get('child', params), isEmployer)

  return {
    title,
    chunks: ['user'],
    component: (
      <Layout store={store} {...props}>
        {isEmployer
          ? <EmployerContainer params={props.params}/>
          : <ApplicantContainer params={props.params}/>}
      </Layout>
    )
  }
}

export default action
