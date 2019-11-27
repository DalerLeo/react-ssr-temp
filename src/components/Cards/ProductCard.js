import * as STATE from 'constants/stateNames'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { path, find, propEq, pathOr } from 'ramda'
import { CartButton, Button } from 'components/UI/Button'
import Image from 'components/UI/Image'
import Price from 'components/UI/Price'
import ProductContent from 'components/UI/ProductContent'
import NoImage from 'images/NoImage.png'
import { getDataFromState } from 'utils/get'
import equals from 'fast-deep-equal'
import SalePrice from '../UI/SalePrice/SalePrice'
import { setItemToCart } from './storage'

const StyledCard = styled.div`
  background-color: #FFF;
    height: 396px;
    width: 25%;
  border-right: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
  &:nth-child(4) {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  &:nth-child(4n) {
    border-right: none;
  }
`
const ImagePosition = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 37px;
`
const PricePosition = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-top: 24px;
`
const ProductContentPosition = styled.div`
  margin-left: 20px;
  margin-top: 18px;
`
const ButtonPosition = styled.div`
  margin-top: 25px;
  margin-left: 20px;
  float: left;
`
const defArr = []

const ProductCard = props => {
  const { item } = props
  const cartList = useSelector(getDataFromState(STATE.CART), equals)
  const products = pathOr([], ['data'], cartList)
  const dispatch = useDispatch()
  const [count, setCount] = useState(true)
  const name = path(['name'], item)
  const id = path(['id'], item)
  const price = path(['price'], item)
  const images = pathOr(defArr, ['images'], item)
  const isPrimary = find(propEq('isPrimary', true))(images)
  const idTaker = find(propEq('id', id))(products)
  const idChecker = path(['id'], idTaker)
  console.warn('idTaker: ', idChecker)
  const image = path(['file'], isPrimary)
  return (
    <StyledCard>
      <ImagePosition>
        <Image
          src={typeof image === 'undefined' ? NoImage : image}
          alt="image"
        />
      </ImagePosition>
      <PricePosition>
        <Price price={price} />
        {true && <SalePrice>25000</SalePrice>}
      </PricePosition>
      <ProductContentPosition>
        <ProductContent content={name} />
      </ProductContentPosition>
      <ButtonPosition>
        {id === idChecker ? (
          <CartButton onClick={() => setCount(!count)} />
        ) : (
          <Button
            onClick={value => {
              dispatch(setItemToCart(2, item))
              setCount(!count)
            }}
          >
            В корзину
          </Button>
        )}
      </ButtonPosition>
    </StyledCard>
  )
}
ProductCard.propTypes = {
  item: PropTypes.object
}
export default ProductCard
