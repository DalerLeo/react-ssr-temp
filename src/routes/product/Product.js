import * as STATE from 'constants/stateNames'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { path, find, propEq, pathOr } from 'ramda'
import equals from 'fast-deep-equal'
import CartButton from 'components/UI/Button/CartButton'
import { getDataFromState } from 'utils/get'
import { setItemToCart } from 'components/Cards/storage'
import { favouriteCreateAction, favouriteDeleteAction } from 'routes/favourite/actions'
import Comment from 'components/Comment'
import { Row, Col } from 'components/Grid'
import Container from 'components/Container'

const FavouriteButton = styled.button` 
    background-color: ${props => props.favourite ? 'red' : 'none'}
`
const FakeDiv = styled.div`
  display: flex;
`

const Product = (props) => {
  const { productData } = props

  const dispatch = useDispatch()
  const cartList = useSelector(getDataFromState(STATE.CART), equals)
  const datas = path(['data'], cartList)

  const data = path(['data'], productData)
  const name = path(['name'], data)
  const id = path(['id'], data)
  const filterProduct = find(propEq('id', id))(datas)
  const amount = pathOr(0, ['amount'], filterProduct)
  const isFavourite = path(['data', 'isFavourite'], productData)

  const onChange = value => {
    dispatch(setItemToCart(value, data))
  }

  const [favourite, setFavourite] = useState(isFavourite)

  const onFavourite = () => {
    setFavourite(!favourite)
    favourite ? dispatch(favouriteDeleteAction(id)) : dispatch(favouriteCreateAction(id))
  }

  return (
    <Container>
      <Row>
        <Col span={24}>
          <FakeDiv>
            {name} - {id} - <CartButton amount={amount} onChange={onChange} />
            <FavouriteButton favourite={favourite} onClick={onFavourite}>Favourite</FavouriteButton>
          </FakeDiv>
        </Col>
      </Row>
      <Comment />
    </Container>
  )
}

export default Product
