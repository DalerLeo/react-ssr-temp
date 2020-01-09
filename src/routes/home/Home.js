import * as STATE from 'constants/stateNames'
import React from 'react'
import styled from 'styled-components'
import { path } from 'ramda'
import ProductCardList from 'components/Cards/ProductCardList'
import Container from 'components/Container'
import PopularCategories from 'components/UI/PopularCategories'
import PopularBrends from 'components/UI/PopularBrends'
import AddBanner from 'components/UI/AddBanner'
import ShowMore from 'components/UI/ShowMore'
import Carusel from 'components/UI/Carusel'
import ProductsTitle from 'components/UI/ProductsTitle'
import Skeleton from 'components/UI/Skelet'
import { Col, Row } from 'components/Grid'
import useFetchList from '../../hooks/useFetchList'
import { getProductList } from './actions'

const ProductListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const HeaderMenu = styled.div`
  margin-top: 24px;
  display: flex;
`
const ProductsTitleStyled = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 23px;
  line-height: 164.57%;
  color: #2E384C;
  margin-top: 20px;
  margin-bottom: 20px;
`
const PopularBlock = styled.div`
  margin: 70px 0 0 20px;
`
const Home = props => {
  const { products } = props

  const productData = useFetchList({
    action: getProductList,
    stateName: STATE.PRODUCT_LIST
  })
  const loading = path(['loading'], productData)

  return (
    <Container>
      <HeaderMenu>
        {/* <MenuBar /> */}
        <Carusel />
      </HeaderMenu>
      <Row>
        <ProductsTitleStyled>
          Популярные товары
        </ProductsTitleStyled>
      </Row>
      <Row>
        {loading ? <Skeleton count={9} col={4} /> : <ProductsTitle />}
      </Row>
      <Row>
        <ProductListBlock>
          <ProductCardList productData={productData} products={products} column={4} />
        </ProductListBlock>
      </Row>
      <Row>
        <ProductsTitleStyled>
          Новинки
        </ProductsTitleStyled>
      </Row>
      <Row>
        <ProductListBlock>
          <ProductCardList productData={productData} products={products} column={4} />
        </ProductListBlock>
      </Row>
      <PopularBlock>
        <PopularCategories />
      </PopularBlock>
      <AddBanner />
      <PopularBlock>
        <PopularBrends />
      </PopularBlock>
      <ProductsTitleStyled>
          Лучшие товары за месяц
      </ProductsTitleStyled>
      <ProductsTitle />
      <ProductListBlock>
        <ProductCardList productData={productData} products={products} column={4} />
      </ProductListBlock>
      <ShowMore />
    </Container>
  )
}

export default Home
