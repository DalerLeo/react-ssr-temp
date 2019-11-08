import React from 'react'
import styled from 'styled-components'
import {path} from 'ramda'
import Header from 'components/UI/Header'
import Container from 'components/Container'

import { getProductCategoryList } from './actions'
import useFetchList from '../../hooks/useFetchList'

const Categories = ({id, ...props}) => {

  const mapper = (history, params) => {
    return id
  }
  
    const productCategoryData = useFetchList({
      action: getProductCategoryList,
      stateName: 'productCategoryList',
      mapper
    })
    const categoryProducts = path(['results'], productCategoryData)
    console.warn(categoryProducts)
  return (
    <div>
      <Header />
      <Container>
        <div>
          {categoryProducts.map((categoryProduct, key) => {
            const productName = path(['name'], categoryProduct)
            const productPrice = path(['price'], categoryProduct)
            return (
              <div key={key}>
                <div>{productName}</div>
                <div>{productPrice}</div>
              </div>
            )
          })}
        </div>
      </Container>
    </div>
  )
}

export default Categories
