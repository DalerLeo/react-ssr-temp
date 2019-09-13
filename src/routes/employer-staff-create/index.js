/* eslint-disable func-style */
import React from 'react'
import SettingContainer from './StaffCreateContainer'
import Layout from 'components/Layout'

function action (props) {
  const { store } = props
  return {
    title: 'Создание пользователя',
    component: (
      <Layout {...props} store={store}>
        <SettingContainer/>
      </Layout>
    )
  }
}

export default action
