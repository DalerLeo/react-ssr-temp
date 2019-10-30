import React from 'react'
import styled from 'styled-components'
import Header from 'components/UI/Header'
import ProductCardList from 'components/Cards/ProductCardList'
import Container from 'components/Container'
import PopularCategories from 'components/UI/PopularCategories'
import AddBanner from 'components/UI/AddBanner'
import ProductsTitle from 'components/UI/ProductsTitle'
import ShowMore from 'components/UI/ShowMore'
import MenuBar from 'components/UI/MenuBar'
import Carusel from 'components/UI/Carusel'

const ProductListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const HeaderMenu = styled.div`
  display: flex;
  padding-top: 120px;
`
const products = [
  {
    price: 123000,
    content: 'Something Something Something Something Something Something Something',
    sale: true
  },
  {
    price: 123000,
    content: 'Something Something Something Something Something Something Something',
    sale: false
  },
  {
    price: 123000,
    content: 'Something Something Something Something Something Something Something',
    sale: false
  },
  {
    price: 123000,
    content: 'Something Something Something Something Something Something Something',
    sale: true
  },
  {
    price: 123000,
    content: 'Something Something Something Something Something Something Something ',
    sale: false
  },
  {
    price: 123000,
    content: 'Something Something Something Something Something Something Something',
    sale: true
  },
  {
    price: 123000,
    content: 'Something Something Something Something Something Something Something',
    sale: false
  },
  {
    price: 123000,
    content: 'Something Something Something Something Something Something Something',
    sale: true
  }
]
const Home = props => {
  return (
    <div>
      <Header />
      <Container>
        <HeaderMenu>
          <MenuBar />
          <Carusel></Carusel>
        </HeaderMenu>
        <ProductsTitle title="Популярные товары" />
        <ProductListBlock>
          <ProductCardList products={products}/>
        </ProductListBlock>
        <ProductsTitle title="Новинки" pagination={true} />
        <ProductListBlock>
          <ProductCardList products={products}/>
        </ProductListBlock>
        <ProductsTitle title="Популярные категории" />
        <PopularCategories />
        <AddBanner />
        <ProductsTitle title="Популярные бренды" pagination={true} />
        <PopularCategories />
        <ProductsTitle title="Лучшие товары за месяц" />
        <ProductListBlock>
          <ProductCardList products={products}/>
        </ProductListBlock>
        <ShowMore />
      </Container>
    </div>
  )
}

export default Home
