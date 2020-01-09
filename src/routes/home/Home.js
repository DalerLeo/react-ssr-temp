import React from 'react'
import styled from 'styled-components'
import { path } from 'ramda'
import ProductCardList from 'components/Cards/ProductCardList'
import SectionTitle from 'components/StyledElems/SectionTitle'
import ContainerUI from 'components/Container'
import PopularBrends from 'components/UI/PopularBrends'
import AddBanner from 'components/UI/AddBanner'
import Carusel from 'components/UI/Carusel'
import ProductsTitle from 'components/UI/ProductsTitle'
import Skeleton from 'components/UI/Skelet'
import PropTypes from 'prop-types'

const Container = styled(ContainerUI)`
  padding-bottom: 60px;
`
const ProductListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
`
const HeaderMenu = styled.div`
  margin: 24px 0 88px;
  display: flex;
`

const PopularBlock = styled.div`
  margin: 50px 0 50px 0px;
`
const Home = props => {
  const { productData } = props

  const loading = path(['loading'], productData)

  return (
    <Container>
      <HeaderMenu>
        <Carusel />
      </HeaderMenu>

      <SectionTitle>
          Популярные товары
      </SectionTitle>
      {loading ? <Skeleton count={9} col={4} /> : <ProductsTitle />}

      <ProductListBlock>
        <ProductCardList productData={productData} column={4} />
      </ProductListBlock>

      <SectionTitle>
          Новинки
      </SectionTitle>

      <ProductListBlock>
        <ProductCardList productData={productData} column={4} />
      </ProductListBlock>
      <AddBanner />
      <PopularBlock>
        <PopularBrends />
      </PopularBlock>
      <SectionTitle>
          Лучшие товары за месяц
      </SectionTitle>
      <ProductsTitle />
      <ProductListBlock>
        <ProductCardList productData={productData} column={4} />
      </ProductListBlock>
    </Container>
  )
}

Home.propTypes = {
  productData: PropTypes.object
}

export default Home
