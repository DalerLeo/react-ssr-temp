import React from 'react'
import styled from 'styled-components'
import {path} from 'ramda'
import Header from 'components/UI/Header'
import Container from 'components/StyledElems/Container'
import ProductCard from 'components/Cards/ProductCard'
import { getProductCategoryList } from './actions'
import useFetchList from '../../hooks/useFetchList'


const ProductListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Categories = ({id, ...props}) => {
  const mapper = (history, params) => {
    return id
  }

    const productCategoryData = useFetchList({
      action: getProductCategoryList,
      stateName: 'productCategoryList',
      mapper
    })
    const items = path(['results'], productCategoryData)
  return (
    <div>
      <Header />
      <Container>
        <ProductListBlock>
          {items.map((item, key) => {
            return (
              <ProductCard key={key} item={item}/>
            )
          })}
        </ProductListBlock>
      </Container>
    </div>
  )
}

export default Categories
