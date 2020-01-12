import React from 'react'
import styled from 'styled-components'
import { path, find, propEq } from 'ramda'
import NoImage from 'images/NoImage.png'

const ProductDetail = styled.div`
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid #E7E8EA;
    &:nth-last-child(1) {
      border-bottom: none;
    }
    &:nth-child(1) {
      padding-top: 0;
    }
`
const ProductImage = styled.img`
    width: 60px;
    height: 60px;
    margin-right: 26px;
`
const ProductDescription = styled.div`

`
const ProductName = styled.div`

`
const ProductAmount = styled.div`
    display: flex;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 129.96%;
    color: #818591;
    mix-blend-mode: normal;
    margin-top: 6px;
`
const AmountBlock = styled.div`
`
const PriceBlock = styled.div`
    margin-left: 27px;
`
const MyOrderProducts = (props) => {
  const { productItem } = props
  return (
    <div>
      {productItem.map((productDetail, key1) => {
        const productName = path(['product', 'name'], productDetail)
        const productAmount = path(['amount'], productDetail)
        const productPrice = path(['price'], productDetail)
        const images = path(['product', 'images'], productDetail)
        const isPrimary = find(propEq('isPrimary', true))(images)
        const image = path(['image'], isPrimary)
        return (
          <>
            <ProductDetail key={key1}>
              <ProductImage src={typeof image === 'undefined' ? NoImage : image} alt="productImage" />
              <ProductDescription>
                <ProductName>
                  {productName}
                </ProductName>
                <ProductAmount>
                  <AmountBlock>
                    {productAmount} шт. х
                  </AmountBlock>
                  <PriceBlock>
                    {productPrice} сум
                  </PriceBlock>
                </ProductAmount>
              </ProductDescription>
            </ProductDetail>
          </>
        )
      })}
    </div>
  )
}

export default MyOrderProducts
