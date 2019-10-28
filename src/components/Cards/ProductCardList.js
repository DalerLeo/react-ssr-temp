import React from 'react'
import styled from 'styled-components'
import { path } from 'ramda'
import { Card } from 'components/Cards'
import Button from 'components/UI/Button'
import Image from 'components/UI/Image'
import Price from 'components/UI/Price'
import ProductContent from 'components/UI/ProductContent'
import SalePrice from '../UI/SalePrice/SalePrice'
import img1 from 'images/25.png'

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

const mapChild = item => {
  const price = path(['price'], item)
  const content = path(['content'], item)
  const sale = path(['sale'], item)
  return (
    <StyledCard>
      <ImagePosition>
        <Image src={img1} alt="image"/>
      </ImagePosition>
      <PricePosition>
        <Price price={price}/>
        {sale && <SalePrice>25 000</SalePrice>}
      </PricePosition>
      <ProductContentPosition>
        <ProductContent content={content}/>
      </ProductContentPosition>
      <ButtonPosition>
        <Button label="В корзину"/>
      </ButtonPosition>
    </StyledCard>
  )
}
const ProductCardList = (props) => {
  const { products } = props
  return products.map(mapChild)
}

export default ProductCardList
