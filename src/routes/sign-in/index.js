import React from 'react'
import Layout from 'components/Layout'
import SignInContainer from './SignInContainer'

async function action (props) {
  const { store, isServer } = props
  if (isServer) {

  }
  return {
    title: 'Логин',
    component: (
      <Layout {...props}>
        <SignInContainer />
      </Layout>
    )
  }
}

export default action
