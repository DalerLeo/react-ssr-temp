import React from 'react'
import styled from 'styled-components'
import { path } from 'ramda'
import ProductCardList from 'components/Cards/ProductCardList'
import SectionTitle from 'components/StyledElems/SectionTitle'
import ContainerUI from 'components/Container'
// Import PopularBrends from 'components/UI/PopularBrends'
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
  margin-top: 30px;
`
const Home = props => {
  const { productData } = props

  const loading = path(['loading'], productData)

  return (
    <Container>
      <HeaderMenu>
        <Carusel section="main" />
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
      <Carusel section="main_center" />
      <PopularBlock>
        <SectionTitle>
          Лучшие товары за месяц
        </SectionTitle>
      </PopularBlock>
      <ProductsTitle />
      <ProductListBlock>
        <ProductCardList productData={productData} column={4} />
      </ProductListBlock>
      <Carusel section="main_bottom" />

    </Container>
  )
}

Home.propTypes = {
  productData: PropTypes.object
}

export default Home
