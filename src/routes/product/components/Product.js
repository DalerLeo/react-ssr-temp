import * as STATE from 'constants/stateNames'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { path, find, propEq, pathOr } from 'ramda'
import equals from 'fast-deep-equal'
import { Button } from 'components/UI/Button'
import { getDataFromState, getPrimaryImage } from 'utils/get'
import { setItemToCart } from 'components/Cards/storage'
import { favouriteCreateAction, favouriteDeleteAction } from 'routes/favourite/actions'
import Comment from 'components/Comment'
import { Row, Col } from 'components/Grid'
import Container from 'components/Container'
import numberFormat from 'utils/numberFormat'
import Rating from 'components/UI/Rating'
import SalePrice from 'components/UI/SalePrice'
import FavoriteIcon from 'icons/Favorite'
import payme from 'images/payme.png'
import click from 'images/click.png'
import uzcard from 'images/uzcard.png'
import ProductsTitle from 'components/UI/ProductsTitle'
import ProductCardList from 'components/Cards/ProductCardList'
import useFetchList from 'hooks/useFetchList'
import { getProductList } from '../actions'
import Feature from './Feature'

const FavouriteButton = styled.button`
    background-color: ${props => props.favourite ? 'red' : 'none'};
    border: 1px solid #818591;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 14px 37px;
    margin-top: 10px;
    margin-left: 16px;
    display: flex;
    outline: 0;
    cursor: pointer;
    > svg {
      fill: ${props => props.favourite ? 'black' : 'none'};
    }
`
const FavIconText = styled.div`
  margin-left: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 129.96%;
  color: #818591;
`
const ContainerUI = styled(Container)`
  margin-top: 30px;
`
const Title = styled.h1`
  margin: 0;
  font-weight: bold;
  font-size: 24px;
  line-height: 124%;
`

const Price = styled.div`
  font-weight: bold;
  font-size: 30px;
  line-height: 129.96%;
  margin-top: 36px;
  margin-bottom: 28px;
  color: #28A97C;
  margin-right: 30px;
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
const Artikul = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 129.96%;
  color: #818591;
  margin-bottom: 7px;
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
const CommentsCount = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 129.96%;
  color: #818591; 
  margin-left: 27px;
`
const BrendTitle = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 129.96%;
  color: #2E384C;
`
const BrendName = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 129.96%;
  color: #2E384C;
`
const Payment = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 129.96%;
  color: #2E384C;
`
const PaymentImage = styled.img`
  margin-right: 20px;
  cursor: pointer;
`
const ProductListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Product = (props) => {
  const popularData = useFetchList({
    action: getProductList,
    stateName: STATE.PRODUCT_LIST
  })
  const { productData, onSubmit, commentList } = props

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
  const image = getPrimaryImage(data)

  const onChange = value => {
    dispatch(setItemToCart(value, data))
  }

  const [favourite, setFavourite] = useState(isFavourite)

  const onFavourite = () => {
    setFavourite(!favourite)
    favourite ? dispatch(favouriteDeleteAction(id)) : dispatch(favouriteCreateAction(id))
  }

  return (
    <ContainerUI>
      <Row gutter={20}>
        <Col span={1}>
          {images.map((img, key) => {
            return <ImageOptions key={key} src={img.image} alt="product images" />
          })}
        </Col>
        <Col span={12}>
          <Img src={image} alt="Product Image" />
        </Col>
        <Col span={11}>
          <Artikul>артикул: 264723648212</Artikul>
          <Title>{name}</Title>
          <br />
          <FlexBlock>
            <Rating />
            <CommentsCount>3 отзыва</CommentsCount>
          </FlexBlock>
          <FlexBlock>
            <Price>{numberFormat(price, 'сум')}</Price>
            <SalePrice />
          </FlexBlock>
          <FlexBlock>
            <Button amount={amount} onChange={onChange}> В корзину</Button>
            <FavouriteButton favourite={favourite} onClick={onFavourite}>
              <FavoriteIcon />
              <FavIconText>В избранное</FavIconText>
            </FavouriteButton>
          </FlexBlock>
          <br />
          <BrendTitle>Бренд (производитель)</BrendTitle>
          <BrendName>ООО «Петелинка»</BrendName>
          <br />
          <Payment>Оплата</Payment>
          <br />
          <FlexBlock>
            <PaymentImage src={payme} alt="payme" />
            <PaymentImage src={click} alt="click" />
            <PaymentImage src={uzcard} alt="uzcard" />
          </FlexBlock>
        </Col>
      </Row>
      <H2>Описание товара</H2>
      <div>{description}</div>
      <H2>Основное</H2>
      <Feature label="Страна-изготовитель">{country}</Feature>
      <Feature label="Бренд">{brand}</Feature>
      {productOptions.map(option => {
        const label = path(['optionsValue', 'option', 'name'], option)
        const value = path(['optionsValue', 'value'], option)
        return (
          <Feature key={option.id} label={label}>{value}</Feature>
        )
      })}
      <ProductsTitle title="Новинки" pagination={true} />
      <ProductListBlock>
        <ProductCardList productData={popularData} column={4} />
      </ProductListBlock>
      <br />
      <Comment onSubmit={onSubmit} commentList={commentList} />
    </ContainerUI>
  )
}

export default Product
