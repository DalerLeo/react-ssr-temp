import * as STATE from 'constants/stateNames'
import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { path, find, propEq, pathOr, prop } from 'ramda'
import { CartButton, Button } from 'components/UI/Button'
import Image from 'components/UI/Image'
import NoImage from 'images/NoImage.png'
import { getDataFromState } from 'utils/get'
import equals from 'fast-deep-equal'
import Link from 'components/Link/Link'
import { setItemToCart } from './storage'
import numberFormat from "../../utils/numberFormat";

const StyledCard = styled.div`
  position: relative;
  background-color: #FFF;
  border-left: ${props => props.theme.cardBorder};
  padding: 12px;
  width: ${props => props.column === 3 ? 'calc(100% / 3)' : '25%'};
  :first-child {
  border-left: none;

  }
`
const ImagePosition = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 37px;
`
const PricePosition = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;

`

const ProductName = styled.div`
  font-weight: 500;
  margin-top: 24px;
`
const ButtonPosition = styled.div`
  margin-top: 12px;

`
const Price = styled.div`
    color: #FD511A;
    font-size: 16px;
    line-height: 129.96%;
`

const defArr = []

const ProductCard = props => {
  const { item, column } = props
  const cartList = useSelector(getDataFromState(STATE.CART), equals)

  const products = pathOr(defArr, ['data'], cartList)
  const dispatch = useDispatch()
  const name = path(['name'], item)
  const id = path(['id'], item)
  const price = path(['price'], item)
  const images = pathOr(defArr, ['images'], item)
  const isPrimary = find(propEq('isPrimary', true))(images)
  const cartProduct = find(propEq('id', id))(products)
  const idChecker = path(['id'], cartProduct)
  const image = path(['image'], isPrimary)
  const amount = prop('amount', cartProduct)

  const onChange = value => {
    dispatch(setItemToCart(value, item))
  }

  return (
    <StyledCard column={column}>
      <Link to={'/product/' + id}>
        <ImagePosition>
          <Image
            src={typeof image === 'undefined' ? NoImage : image}
            alt="image"
          />
        </ImagePosition>
        <ProductName>{name}</ProductName>
        <PricePosition>
          <Price>{numberFormat(price)}</Price>
        </PricePosition>
      </Link>
      <ButtonPosition>
        {id === idChecker ? (
          <CartButton amount={amount} onChange={onChange} />
        ) : (
          <Button
            onClick={value => {
              dispatch(setItemToCart(1, item))
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
