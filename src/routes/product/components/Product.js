import * as STATE from 'constants/stateNames'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { path, find, propEq, pathOr } from 'ramda'
import equals from 'fast-deep-equal'
import CartButton from 'components/UI/Button/CartButton'
import { getDataFromState, getPrimaryImage } from 'utils/get'
import { setItemToCart } from 'components/Cards/storage'
import { favouriteCreateAction, favouriteDeleteAction } from 'routes/favourite/actions'
import Comment from 'components/Comment'
import { Row, Col } from 'components/Grid'
import Container from 'components/Container'
import Feature from './Feature'
import numberFormat from 'utils/numberFormat'
const FavouriteButton = styled.button` 
    background-color: ${props => props.favourite ? 'red' : 'none'}
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
/* identical to box height, or 39px */


color: #28A97C;
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

const Product = (props) => {
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
        <Col span={12}>
          <Img src={image} alt="Product Image" />
        </Col>
        <Col span={12}>
          <Title>{name}</Title>
          <Price>{numberFormat(price, 'сум')}</Price>
          <CartButton amount={amount} onChange={onChange} />
          <FavouriteButton favourite={favourite} onClick={onFavourite}>Favourite</FavouriteButton>
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
      <Comment onSubmit={onSubmit} commentList={commentList} />
    </ContainerUI>
  )
}

export default Product
