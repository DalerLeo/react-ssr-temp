import React from 'react'
import styled from 'styled-components'
import { path } from 'ramda'
import Header from 'components/UI/Header'
import Container from 'components/StyledElems/Container'
import ProductCard from 'components/Cards/ProductCard'
import Pagination from 'components/Pagination'
import Skelet from 'components/UI/Skelet/Skelet'
import useFetchList, { getListParams } from '../../hooks/useFetchList'
import { getProductCategoryList } from './actions'

const ProductListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Categories = ({ id, ...props }) => {
  const mapper = (history, params) => {
    const pars = getListParams(history, ['page'])
    return { ...pars, type: id }
  }

  const productCategoryData = useFetchList({
    action: getProductCategoryList,
    stateName: 'productCategoryList',
    mapper
  })
  const items = path(['results'], productCategoryData)
  const count = path(['data', 'count'], productCategoryData)
  const loading = path(['loading'], productCategoryData)
  return (
    <div>
      <Header />
      <Container>
        {loading ? <Skelet count={9} />
          : (
            <ProductListBlock>
              {items.map((item, key) => {
                return (
                  <ProductCard key={key} item={item} />
                )
              })}
            </ProductListBlock>
          )}
        <Pagination count={count} pageSize={12} />
      </Container>
    </div>
  )
}

export default Categories
