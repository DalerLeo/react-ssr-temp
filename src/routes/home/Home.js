import * as STATE from 'constants/stateNames'
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
  const { products } = props
  const productData = useFetchList({
    action: getProductList,
    stateName: STATE.PRODUCT_LIST
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
          <ProductCardList productData={productData} products={products} />
        </ProductListBlock>
        <ProductsTitle title="Новинки" pagination={true} />
        <ProductListBlock>
          <ProductCardList productData={productData} products={products} />
        </ProductListBlock>
        <PopularCategories />
        <AddBanner />
        <PopularCategories />
        <ProductsTitle title="Лучшие товары за месяц" />
        <ProductListBlock>
          <ProductCardList productData={productData} products={products} />
        </ProductListBlock>
        <ShowMore />
      </Container>
    </div>
  )
}

export default Home
