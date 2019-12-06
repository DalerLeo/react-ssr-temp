import * as STATE from 'constants/stateNames'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { path, find, propEq, pathOr, prop } from 'ramda'
import { CartButton, Button } from 'components/UI/Button'
import Image from 'components/UI/Image'
import Price from 'components/UI/Price'
import ProductContent from 'components/UI/ProductContent'
import NoImage from 'images/NoImage.png'
import { getDataFromState } from 'utils/get'
import equals from 'fast-deep-equal'
import Link from 'components/Link/Link'
import { favouriteCreateAction, favouriteDeleteAction } from 'routes/favourite/actions'
import SalePrice from '../UI/SalePrice/SalePrice'
import { setItemToCart } from './storage'

const StyledCard = styled.div`
  position: relative;
  background-color: #FFF;
  height: 396px;
  width: 25%;
  border-right: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
  border-top-left-radius: 5px;
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
  position: absolute;
  bottom: 25px;
  left: 20px;
`
const FavouriteButton = styled.button` 
    background-color: ${props => props.favourite ? 'red' : 'none'}
`
const defArr = []

const ProductCard = props => {
  const { item } = props
  const cartList = useSelector(getDataFromState(STATE.CART), equals)
  const products = pathOr(defArr, ['data'], cartList)
  const dispatch = useDispatch()
  const name = path(['name'], item)
  const id = path(['id'], item)
  const price = path(['price'], item)
  const images = pathOr(defArr, ['images'], item)
  const isFavourite = path(['isFavourite'], item)
  const isPrimary = find(propEq('isPrimary', true))(images)
  const cartProduct = find(propEq('id', id))(products)
  const idChecker = path(['id'], cartProduct)
  const image = path(['file'], isPrimary)
  const amount = prop('amount', cartProduct)

  const [favourite, setFavourite] = useState(isFavourite)
  const onChange = value => {
    dispatch(setItemToCart(value, item))
  }

  const onFavourite = () => {
    setFavourite(!favourite)
    favourite ? dispatch(favouriteDeleteAction(id)) : dispatch(favouriteCreateAction(id))
  }

  return (
    <StyledCard>
      <FavouriteButton favourite={favourite} onClick={onFavourite}>Favourite</FavouriteButton>
      <Link to={'/product/' + id}>
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
