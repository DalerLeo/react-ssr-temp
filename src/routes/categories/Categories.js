import React from 'react'
import styled from 'styled-components'
import { path, map } from 'ramda'
import Header from 'components/UI/Header'
import ContainerUI from 'components/StyledElems/Container'
import ProductCard from 'components/Cards/ProductCard'
import Pagination from 'components/Pagination'
import Skelet from 'components/UI/Skelet/Skelet'

import Filter from './Filter'

const Container = styled(ContainerUI)`
   display: flex;
`

const ProductListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 200px)
`

const Categories = (props) => {
  const { productCategoryData, filterData } = props

  const items = path(['results'], productCategoryData)
  const count = path(['data', 'count'], productCategoryData)
  const loading = path(['loading'], productCategoryData)
  return (
    <div>
      <Header />
      <Container>
        <Filter {...filterData} />
        {loading ? <Skelet count={9} />
          : (
            <ProductListBlock>
              {items.map((item, key) => {
                return (
                  <ProductCard key={key} item={item} column={3} />
                )
              })}
            </ProductListBlock>
          )}

      </Container>
      <Container>
        <Pagination count={count} pageSize={12} />
      </Container>
    </div>
  )
}

export default Categories
