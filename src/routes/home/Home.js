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
import testCatlogo from '../../images/testCatlogo.png'

const Container = styled(ContainerUI)`
  padding-bottom: 60px;
`
const ProductListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
`
const CategoryBlock = styled.div`
  display: flex;
  margin-bottom: 50px;
  background: #FFF;
  border: 1px solid #F2F2F2 ;
  border-right: 0px;
  padding: 0;
  box-sizing: border-box;
  border-radius: 5px 0px 0px 5px;
  height: 208px;
`
const CategoryItemBlock = styled.div`
  display: flex;
  justify-content: space-between;
   padding: 0;
   border-right: 1px solid #F2F2F2;
`
const CategoryMainTitle = styled.div`
    font-size: 24px;
    margin-bottom: 10px;
`
const CategoryDescription = styled.div`
   font-size: 14px;
    margin-bottom: 14px;
`
const CategoryButtonTitle = styled.div`
    padding: 13px  37px 15px 37px;
    text-align: center;
    font-size: 12px;
    height: 39px;
    width: 129px;
    background: #FFD54C;
    opacity: 0.8;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    color: #333333;
`

const CategoryLeftSide = styled.div`
    padding: 45px;
`
const CategoryRightSide= styled.div`
     padding: 45px 90px 45px 45px;
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
        Категория продуктов
      </SectionTitle>
      <CategoryBlock>

        <CategoryItemBlock>
          <CategoryLeftSide>
            <CategoryMainTitle>Шины & Диски</CategoryMainTitle>
            <CategoryDescription>Получайте новые диски прямо из Китая и США</CategoryDescription>
            <CategoryButtonTitle>КУПИТЬ</CategoryButtonTitle>

          </CategoryLeftSide>

          <div>
            <img src={testCatlogo} alt="" />
          </div>

        </CategoryItemBlock>

        <CategoryItemBlock>
          <CategoryLeftSide>
            <CategoryMainTitle>Шины & Диски</CategoryMainTitle>
            <CategoryDescription>Получайте новые диски прямо из Китая и США</CategoryDescription>
            <CategoryButtonTitle>КУПИТЬ</CategoryButtonTitle>

          </CategoryLeftSide>

          <div>
            <img src={testCatlogo} alt="" />
          </div>

        </CategoryItemBlock>



      </CategoryBlock>

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
      <PopularBlock>
        <SectionTitle>
          Лучшие товары за месяц
        </SectionTitle>
      </PopularBlock>
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
