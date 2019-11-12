import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { path, find, propEq } from 'ramda'
import { Card } from 'components/Cards'
import {CartButton, Button} from 'components/UI/Button'
import Image from 'components/UI/Image'
import Price from 'components/UI/Price'
import ProductContent from 'components/UI/ProductContent'
import SalePrice from '../UI/SalePrice/SalePrice'
import {setItemToCart, removeItemFrom} from './storage'
import ProductCard from './ProductCard'
const StyledCard = styled(Card)`
  border-right: 1px solid #E1E1E1;
  border-bottom: 1px solid #E1E1E1;
  &:nth-child(4){
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
}
  &:nth-child(4n){
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
  margin-top: 30px;
  margin-left: 20px;
`

const ProductCardList = (props) => {
  const { productData } = props
  const results = path(['results'], productData)
  return results.map(mapChild)
}

const mapChild = item => {
  return <ProductCard item={item} />
}

export default ProductCardList
