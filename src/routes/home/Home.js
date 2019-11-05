import React from 'react'
import styled from 'styled-components'
import Header from 'components/UI/Header'
import ProductCardList from 'components/Cards/ProductCardList'
import Container from 'components/Container'
import PopularCategories from 'components/UI/PopularCategories'
import AddBanner from 'components/UI/AddBanner'
import ShowMore from 'components/UI/ShowMore'
import MenuBar from 'components/UI/MenuBar'
import Carusel from 'components/UI/Carusel'
import ProductsTitle from 'components/UI/ProductsTitle'
import products from './cons'

import { getProductList } from './actions'
import useFetchList from '../../hooks/useFetchList'

const ProductListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const HeaderMenu = styled.div`
  display: flex;
  padding-top: 120px;
`

const Home = props => {
  const productData = useFetchList({
    action: getProductList,
    stateName: 'productList'
  })

  console.warn(productData)

  return (
    <div>
      <Header />
      <Container>
        <HeaderMenu>
          <MenuBar />
          <Carusel />
        </HeaderMenu>
        <ProductsTitle title="Популярные товары" />
        <ProductListBlock>
          <ProductCardList products={products} />
        </ProductListBlock>
        <ProductsTitle title="Новинки" pagination={true} />
        <ProductListBlock>
          <ProductCardList products={products} />
        </ProductListBlock>
        <PopularCategories />
        <AddBanner />
        <PopularCategories />
        <ProductsTitle title="Лучшие товары за месяц" />
        <ProductListBlock>
          <ProductCardList products={products} />
        </ProductListBlock>
        <ShowMore />
      </Container>
    </div>
  )
}

export default Home
