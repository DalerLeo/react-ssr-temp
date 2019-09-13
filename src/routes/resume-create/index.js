/* eslint-disable func-style */
import React from 'react'
import ResumeCreateContainer from './ResumeCreateContainer'
import Layout from 'components/Layout'
import fpGet from 'lodash/fp/get'

function action (props) {
  const { store, params } = props
  const isView = fpGet('actionName', params) === 'view'
  return {
    chunks: ['resume-create'],
    title: isView ? 'Просмотр резюме' : 'Создание резюме',
    component: (
      <Layout {...props} store={store} simple={true}>
        <ResumeCreateContainer {...params}/>
      </Layout>
    )
  }
}

export default action
