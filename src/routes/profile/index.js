import React from 'react'
import Layout from 'components/Layout'
import ProfileContainer from './ProfileContainer'

async function action (props) {
  const { store, isServer } = props
  if (isServer) {

  }
  return {
    chunk: ['profile'],
    title: 'Профиль',
    component: (
      <Layout {...props}>
        <ProfileContainer />
      </Layout>
    )
  }
}

export default action
