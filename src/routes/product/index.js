/* eslint-disable func-style */
import React from 'react'
import Layout from 'components/Layout'
import ProductContainer from './ProductContainer'
import { getProduct } from './actions'

async function action (props) {
  const { store, isServer, params } = props

  await store.dispatch(getProduct(params.id))
  return {
    chunk: ['categories'],
    title: 'Главная',
    component: (
      <Layout {...props} home={true}>
        <ProductContainer {...params} />
      </Layout>
    )
  }
}

export default action
