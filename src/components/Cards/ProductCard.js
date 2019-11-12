import React, { useState } from 'react'
import styled from 'styled-components'
import { path, find, propEq } from 'ramda'
import { Card } from 'components/Cards'
import { CartButton, Button } from 'components/UI/Button'
import Image from 'components/UI/Image'
import Price from 'components/UI/Price'
import ProductContent from 'components/UI/ProductContent'
import NoImage from 'images/NoImage.png'
import SalePrice from '../UI/SalePrice/SalePrice'
import { setItemToCart, removeItemFrom } from './storage'

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
const ProductDard = (props) => {
  const { item } = props
  const [count, setCount] = useState(true)
  const name = path(['name'], item)
  const price = path(['price'], item)
  const images = path(['images'], item)
  const isPrimary = find(propEq('isPrimary', true))(images)
  const image = path(['file'], isPrimary)
  return (
    <StyledCard>
      <ImagePosition>
        <Image src={typeof (image) === 'undefined' ? NoImage : image} alt="image" />
      </ImagePosition>
      <PricePosition>
        <Price price={price} />
        {true && <SalePrice>25000</SalePrice>}
      </PricePosition>
      <ProductContentPosition>
        <ProductContent content={name} />
      </ProductContentPosition>
      <ButtonPosition>
        {count ? <Button
          onRemove={() => removeItemFrom(id)}
          onClick={value => {
            setItemToCart(2, item)
            setCount(!count)
          }}
                 >
                    В корзину
        </Button> : <CartButton onClick={() => setCount(!count)} />}
      </ButtonPosition>
    </StyledCard>
  )
}

export default ProductDard
