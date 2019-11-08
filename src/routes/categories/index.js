/* eslint-disable func-style */
import React from 'react'
import Layout from 'components/Layout'
import CategoriesContainer from './CategoriesContainer'

async function action (props) {
  const { store, isServer, params } = props

  console.warn(props)
  if (isServer) {
  }
  return {
    title: 'Главная',
    component: (
      <Layout {...props} home={true}>
        <CategoriesContainer {...params}/>
      </Layout>
    )
  }
}

export default action
