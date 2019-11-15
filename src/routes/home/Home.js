import React from 'react'
import styled from 'styled-components'
import ProductCardList from 'components/Cards/ProductCardList'
import Container from 'components/StyledElems/Container'
import PopularCategories from 'components/UI/PopularCategories'
import AddBanner from 'components/UI/AddBanner'
import ShowMore from 'components/UI/ShowMore'
import MenuBar from 'components/UI/MenuBar'
import Carusel from 'components/UI/Carusel'
import ProductsTitle from 'components/UI/ProductsTitle'

import useFetchList from '../../hooks/useFetchList'
import { getProductList } from './actions'

const ProductListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const HeaderMenu = styled.div`
  display: flex;
`

const Home = props => {
  const productData = useFetchList({
    action: getProductList,
    stateName: 'productList'
  })
  return (
    <div>

      <Container>
        <HeaderMenu>
          <MenuBar />
          <Carusel />
        </HeaderMenu>
        <ProductsTitle title="Популярные товары" />
        <ProductListBlock>
          <ProductCardList productData={productData} />
        </ProductListBlock>
        <ProductsTitle title="Новинки" pagination={true} />
        <ProductListBlock>
          <ProductCardList productData={productData} />
        </ProductListBlock>
        <PopularCategories />
        <AddBanner />
        <PopularCategories />
        <ProductsTitle title="Лучшие товары за месяц" />
        <ProductListBlock>
          <ProductCardList productData={productData} />
        </ProductListBlock>
        <ShowMore />
      </Container>
    </div>
  )
}

export default Home
