import React from 'react'
import Layout from 'components/Layout'
import FavouriteContainer from './FavouriteContainer'

async function action (props) {
  const { store, isServer } = props
  if (isServer) {
  }
  return {
    chunk: ['cart'],
    title: 'Корзина',
    component: (
      <Layout {...props} home={true}>
        <FavouriteContainer />
      </Layout>
    )
  }
}

export default action
