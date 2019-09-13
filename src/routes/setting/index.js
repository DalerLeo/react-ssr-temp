/* eslint-disable func-style */
import React from 'react'
import { getStateToken } from 'helpers/getCookieToken'
import SettingContainer from './SettingContainer'
import Layout from 'components/Layout'

function action (props) {
  const { store } = props

  if (!getStateToken(store.getState())) {
    return { redirect: '/' }
  }

  return {
    title: 'Настройки профиля',
    component: (
      <Layout {...props} store={store}>
        <SettingContainer/>
      </Layout>
    )
  }
}

export default action
