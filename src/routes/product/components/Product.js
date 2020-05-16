import * as STATE from 'constants/stateNames'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { path, find, propEq, pathOr } from 'ramda'
import equals from 'fast-deep-equal'
import { CartButtonDetails, ButtonDetails } from 'components/UI/Button'
import { getDataFromState, getPrimaryImage } from 'utils/get'
import { setItemToCart } from 'components/Cards/storage'
import { favouriteCreateAction, favouriteDeleteAction } from 'routes/favourite/actions'
import { Row, Col } from 'components/Grid'
import numberFormat from 'utils/numberFormat'
import SalePrice from 'components/UI/SalePrice'
import FavoriteIcon from 'icons/Favorite'
import payme from 'icons/Payme.svg'
import click from 'icons/Click.svg'
import uzcard from 'icons/Cash.svg'
import ProductsTitle from 'components/UI/ProductsTitle'
import ProductCardList from 'components/Cards/ProductCardList'
import useFetchList from 'hooks/useFetchList'
import { getProductList } from '../actions'
import NoImage from '../../../images/NoImage.png'
import Carusel from '../../../components/UI/Carusel'
import Feature from './Feature'

const FavouriteButton = styled.button`
    background-color: ${props => props.favourite ? '#828282' : '#828282'};
    box-sizing: border-box;
    border-radius: 5px;
    padding: 14px 37px;
    opacity: 0.8;
    //margin-top: 10px;
    height: 55px;
    margin-left: 16px;
    display: flex;
    outline: 0;
    cursor: pointer;
    > svg {
      fill: ${props => props.favourite ? '#FFF' : 'none'};
    }
`
const FavIconText = styled.div`
  margin-left: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #FFFF;
  line-height: 15px;
  text-align: center;


`
const Wrapper = styled.div`
    background-color: white;
`
const ContainerUI = styled.div`
  margin: 0 auto;
  max-width: 1170px;
  background-color: white;
  padding: 20px 0;
`
const Title = styled.h1`
  margin: 18px 0 0 0 ;
  font-weight: bold;
  font-size: 24px;
  line-height: 124%;
`

const PriceBorder = styled.div`
  border-top: 1px solid #E0E0E0;
  width: 399px;
  margin-top: 22px;
  margin-bottom: 25px;
`
const PriceTitle = styled.div`
  font-size: 18px;
  line-height: 129.96%;
  color: #828282;
`

const Price = styled.div`
  margin-top: 15px;
  margin-bottom: 28px;
  color: #333333;
  margin-right: 30px;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 129.96%;
  mix-blend-mode: normal;

`

const H2 = styled.h2`
  font-weight: bold;
  font-size: 23px;
  line-height: 164.57%;
  margin-top: 45px;
  margin-bottom: 12px;
`

const Img = styled.img`
  width: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 6px;
`
const ImageOptions = styled.img`
  width: 52px;
  height: 52px;
  cursor: pointer;
  background: #fff;
  border: 2px solid #28A97C;
  border-radius: 3px;
  padding: 5px;
  margin-bottom: 10px;
`
const FlexBlock = styled.div`
  display: flex;
  align-items: center;
`
const CategoryTitle = styled.div`
  font-style: normal;
  font-weight: normal;
  margin-left: 7px;
  background: #F2F2F2;
  border-radius: 5px;
  width: 80px;
  height: 27px;
  font-size: 13px;
  line-height: 11px;
  text-align: center;
  color: #828282;
  padding-top: 5px;
`
const Category = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 11px;
  text-align: center;
  color: #828282;
`

const Payment = styled.div`
  font-style: normal;
  line-height: 129.96%;
  margin-bottom: 18px;
  font-weight: normal;
  font-size: 18px;
  color: #828282;
`
const PaymentImage = styled.img`
  margin-right: 20px;
  cursor: pointer;
`
const PopularListBlock = styled.div`
    background-color: #FAFAFA;
    padding: 40px 130px;
`
const ProductListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 20px auto;
`
const PopularProduct = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 164.57%;
  color: #2E384C;

  max-width: 1200px;
  margin: 0 auto;
`
const Descr = styled.pre`
  font-family: inherit;
  white-space: pre-wrap;
  line-height: 22px;
`
const Product = (props) => {
  const popularData = useFetchList({
    action: getProductList,
    stateName: STATE.PRODUCT_LIST
  })
  const { productData, onSubmit, commentList, userInfo, token } = props

  const dispatch = useDispatch()
  const cartList = useSelector(getDataFromState(STATE.CART), equals)

  const datas = pathOr([], ['data'], cartList)
  const data = path(['data'], productData)
  const name = path(['name'], data)
  const price = path(['price'], data)
  const country = path(['country', 'name'], data)
  const brand = path(['brand', 'name'], data)
  const productOptions = path(['productOptions'], data)
  const description = path(['description'], data)
  const id = path(['id'], data)
  const filterProduct = find(propEq('id', id))(datas)
  const amount = pathOr(0, ['amount'], filterProduct)
  const isFavourite = path(['data', 'isFavourite'], productData)
  const images = path(['images'], data)
  const image = path(['images', '0', 'image', 'file'], data)
  // Const image = getPrimaryImage(data)

  const onChange = value => {
    dispatch(setItemToCart(value, data))
  }

  const [favourite, setFavourite] = useState(isFavourite)

  const onFavourite = () => {
    setFavourite(!favourite)
    favourite ? dispatch(favouriteDeleteAction(id)) : dispatch(favouriteCreateAction(id))
  }

  return (
    <Wrapper>
      <ContainerUI>
        <Row gutter={20}>
          <Col span={1}>
            {images.map((img, key) => {
              return <ImageOptions key={key} src={img.image.file} alt="product images" />
            })}
          </Col>
          <Col span={12}>
            <Img src={typeof image === 'undefined' ? NoImage : image} alt="Product Image" />
          </Col>
          <Col span={11}>
            <Title>{name}</Title>
            <br />
            <FlexBlock>
              <Category>Категория:</Category>
              <CategoryTitle>Баллоны</CategoryTitle>
            </FlexBlock>
            <PriceBorder />
            <PriceTitle>
              Цена:
            </PriceTitle>
            <FlexBlock>
              <Price>{numberFormat(price, 'сум')}</Price>
              <SalePrice />
            </FlexBlock>
            <FlexBlock>
              {filterProduct
                ? (<CartButtonDetails amount={amount} onChange={onChange} />)
                : (
                  <ButtonDetails onClick={value => dispatch(setItemToCart(1, data))}>
                    В корзину
                  </ButtonDetails>
                )}

              <FavouriteButton favourite={favourite} onClick={onFavourite}>
                <FavoriteIcon />
                <FavIconText>В избранное</FavIconText>
              </FavouriteButton>
            </FlexBlock>
            <PriceBorder />

            <br />
            <Payment>Способ оплаты : </Payment>
            <FlexBlock>
              <PaymentImage src={payme} alt="payme" />
              <PaymentImage src={click} alt="click" />
              <PaymentImage src={uzcard} alt="uzcard" />
            </FlexBlock>
          </Col>
        </Row>
        <H2>Описание товара</H2>
        <Descr>{description}</Descr>
        <H2>Основное</H2>
        <Feature label="Страна-изготовитель">{country}</Feature>
        <Feature label="Бренд">{brand}</Feature>
        {/* {productOptions.map(option => { */}
        {/*  Const label = path(['optionsValue', 'option', 'name'], option) */}
        {/*  Const value = path(['optionsValue', 'value'], option) */}
        {/*  Return ( */}
        {/*    <Feature key={option.id} label={label}>{value}</Feature> */}
        {/*  ) */}
        {/* })} */}
        <ProductsTitle title="Новинки" />
      </ContainerUI>
      <PopularListBlock>
        <PopularProduct>Рекомендованные товары</PopularProduct>
        <ProductListBlock>
          <ProductCardList productData={popularData} column={4} />
        </ProductListBlock>
      </PopularListBlock>

    </Wrapper>
  )
}

export default Product
