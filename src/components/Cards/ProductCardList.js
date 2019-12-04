import React from 'react'
import { path } from 'ramda'
import ProductCard from './ProductCard'

const ProductCardList = (props) => {
  const { productData } = props

  const results = path(['results'], productData)
  return results.map(mapChild)
}

const mapChild = (item, key) => {
  return <ProductCard item={item} key={key} />
}

export default ProductCardList
