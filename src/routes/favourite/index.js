import React from 'react'
import Layout from 'components/Layout'
import FavouriteContainer from './FavouriteContainer'
import { favoriteListFetch } from './actions'

async function action (props) {
  const { store, isServer } = props
  if (isServer) {
  }

  store.dispatch(favoriteListFetch())
  return {
    chunk: ['favourite'],
    title: 'Корзина',
    component: (
      <Layout {...props} home={true}>
        <FavouriteContainer />
      </Layout>
    )
  }
}

export default action
