/* eslint-disable func-style */
import React from 'react'
import loToInteger from 'lodash/toInteger'
import loGet from 'lodash/get'
import { getServerTitle } from 'helpers/dom'
import toBoolean from 'helpers/toBoolean'
import ResumeDetailsContainer from './ResumeDetailsContainer'
import Layout from 'components/Layout'
import { resumeFetchItem } from './actions'

async function action (props) {
  const { store, isServer, params, query } = props
  const id = loToInteger(params.id)
  const isTemp = toBoolean(loGet(query, 'isTemp'))
  return {
    chunks: ['resume-details'],
    title: await getServerTitle({
      id,
      store,
      isServer,
      action: resumeFetchItem,
      defaultText: 'Просмотр резюме',
      extraParams: [isTemp]
    }),
    component: (
      <Layout store={store} {...props}>
        <ResumeDetailsContainer id={id} isServer={isServer}/>
      </Layout>
    )
  }
}

export default action
