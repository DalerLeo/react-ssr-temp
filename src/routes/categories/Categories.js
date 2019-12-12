import React from 'react'
import styled from 'styled-components'
import { path } from 'ramda'
import Header from 'components/UI/Header'
import ContainerUI from 'components/StyledElems/Container'
import ProductCard from 'components/Cards/ProductCard'
import Pagination from 'components/Pagination'
import Skelet from 'components/UI/Skelet/Skelet'
import useFetchList, { getListParams } from '../../hooks/useFetchList'
import * as STATE from '../../constants/stateNames'
import Filter from './Filter'
import { getProductCategoryList, filterListFetch } from './actions'

const filterList = {
  brands: [
    { id: 6, name: 'rozmetov Yangi', productCount: 1 },
    { id: 5, name: 'ting', productCount: 1 },
    { id: 4, name: 'asdfasdf', productCount: 2 },
    { id: 3, name: 'new', productCount: 19 },
    { id: 2, name: 'Halol', productCount: 1 },
  ],
  prices: {
    minPriceRange: 0,
    maxPriceRange: 41000000
  }

}

const Container = styled(ContainerUI)`
   display: flex;
`

const ProductListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 200px)
`

const Categories = ({ id, ...props }) => {
  const mapper = (history, params) => {
    return { type: id }
  }

  const productCategoryData = useFetchList({
    action: getProductCategoryList,
    stateName: 'productCategoryList',
    mapper
  })

  const filterData = useFetchList({
    action: filterListFetch,
    stateName: STATE.FILTER_LIST,
    mapper
  })

  console.warn(filterData)

  const items = path(['results'], productCategoryData)
  const count = path(['data', 'count'], productCategoryData)
  const loading = path(['loading'], productCategoryData)
  return (
    <div>
      <Header />
      <Container>
        <Filter filterList={filterList} />
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
