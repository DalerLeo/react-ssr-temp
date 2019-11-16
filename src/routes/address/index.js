import React from 'react'
import Layout from 'components/Layout'
import AddressContainer from './AddressContainer'

async function action (props) {
  const { store, isServer } = props
  if (isServer) {

  }
  return {
    chunk: ['address'],
    title: 'Адрес',
    component: (
      <Layout {...props}>
        <AddressContainer />
      </Layout>
    )
  }
}

export default action
