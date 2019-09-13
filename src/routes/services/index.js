/* eslint-disable func-style */
import React from 'react'
import { getStateToken } from 'helpers/getCookieToken'
import ServicesContainer from './ServicesContainer'
import Layout from 'components/Layout'

function action ({ store, isServer, params, ...props }) {
  if (!getStateToken(store.getState())) {
    return { redirect: '/' }
  }
  return {
    title: 'Услуги',
    component: (
      <Layout {...props} store={store} showCart={false}>
        <ServicesContainer params={params}/>
      </Layout>
    )
  }
}

export default action
