import React from 'react'
import styled from 'styled-components'
import { path } from 'ramda'
import ProductCardList from 'components/Cards/ProductCardList'
import SectionTitle from 'components/StyledElems/SectionTitle'
// Import ContainerUI from 'components/Container'
// Import PopularBrends from 'components/UI/PopularBrends'
import Carusel from 'components/UI/Carusel'
import ProductsTitle from 'components/UI/ProductsTitle'
import Skeleton from 'components/UI/Skelet'
import PropTypes from 'prop-types'
import Link from 'components/Link/Link'
import testCatlogo from '../../images/testCatlogo.png'
import Group1 from '../../icons/Group1'
import Group2 from '../../icons/Group2'
import Group3 from '../../icons/Group3'
import Group4 from '../../icons/Group4'
import Container from '../../components/Container'

const Wrapper = styled.div`
    background-color: white;
`
const ContainerUI = styled.div`
  margin: 0 auto;
  max-width: 1170px;
  background-color: white;
  padding: 20px 0;
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
const AnswersBlock = styled.div`
  display: flex;
  margin-bottom: 50px;
  background: #FFF;
  border: 1px solid #F2F2F2 ;
  border-right: 0px;
  padding: 0;
  border-radius: 5px 0px 0px 5px;
  height: 262px;
`

const AnswersItemBlock = styled.div`
   padding: 45px;
   border-right: 1px solid #F2F2F2;
   height:100%;
   width: 25%;
   text-align: center;
   font-size: 18px;
`

const AnswersIconBlock = styled.div`
  margin-bottom: 26px;
`

const HeaderMenu = styled.div`
  margin: 24px 0 88px;

`

const PopularListBlock = styled.div`
    background-color: #FAFAFA;
    padding: 40px 130px;
`

const Home = props => {
  const { productData } = props

  const loading = path(['loading'], productData)

  return (
    <Wrapper>
      <ContainerUI>
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
              <CategoryButtonTitle> <Link to="/categories/3">КУПИТЬ</Link>
              </CategoryButtonTitle>

            </CategoryLeftSide>

            <div>
              <img src={testCatlogo} alt="" />
            </div>

          </CategoryItemBlock>

          <CategoryItemBlock>
            <CategoryLeftSide>
              <CategoryMainTitle>Аккумуляторы</CategoryMainTitle>
              <CategoryDescription>Получайте новые диски прямо из Китая и США</CategoryDescription>
              <CategoryButtonTitle><Link to="/categories/4">КУПИТЬ</Link>
              </CategoryButtonTitle>

            </CategoryLeftSide>

            <div>
              <img src={testCatlogo} alt="" />
            </div>

          </CategoryItemBlock>

        </CategoryBlock>
      </ContainerUI>

      <PopularListBlock>
        <Container>

          <SectionTitle>
            Аккумуляторы
          </SectionTitle>
          {loading ? <Skeleton count={9} col={4} /> : <ProductsTitle />}

          <ProductListBlock>
            <ProductCardList productData={productData} column={4} />
          </ProductListBlock>

          <SectionTitle>
            Шины & Диски
          </SectionTitle>

          <ProductListBlock>
            <ProductCardList productData={productData} column={4} />
          </ProductListBlock>

          <ProductsTitle />

          <SectionTitle>
            Почему именно мы?
          </SectionTitle>

          <AnswersBlock>

            <AnswersItemBlock>

              <AnswersIconBlock>
                <Group1 />
              </AnswersIconBlock>
              <div>
                Круглосуточный call center
              </div>

            </AnswersItemBlock>

            <AnswersItemBlock>

              <AnswersIconBlock>
                <Group2 />
              </AnswersIconBlock>
              <div>
                Широкий ассортимент
              </div>

            </AnswersItemBlock>
            <AnswersItemBlock>

              <AnswersIconBlock>
                <Group3 />
              </AnswersIconBlock>
              <div>
                Быстрая доставка
              </div>

            </AnswersItemBlock>
            <AnswersItemBlock>

              <AnswersIconBlock>
                <Group4 />
              </AnswersIconBlock>
              <div>
                Лучшие цены на рынке
              </div>

            </AnswersItemBlock>

          </AnswersBlock>

        </Container>
      </PopularListBlock>

    </Wrapper>
  )
}

Home.propTypes = {
  productData: PropTypes.object
}

export default Home
