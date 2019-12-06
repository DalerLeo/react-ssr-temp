import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import Container from 'components/StyledElems/Container'
import styled from 'styled-components'
import { path, isEmpty } from 'ramda'
import MinusIcon from 'icons/Minus'
import PlusIcon from 'icons/Plus'
import DeleteIcon from 'icons/Delete'
import NoImage from 'images/NoImage.png'
import NoProductImage from 'images/empty-template-cart.png'
import { setItemToCart } from 'components/Cards/storage'

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FFF;
  width: 714px;
  height: 80px;
  margin-bottom: 15px;
  border-radius: 7px;
  box-shadow: 1px 1px 2px 1px rgba(156,150,156,1);
`
const ProductName = styled.div`
  padding: 0 20px;
  font-size: 16px;
  line-height: 129.96%;
  width: 350px;
`

const GroupButton = styled.div`

`
const DecrementButton = styled.button`
  background-color: transparent;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  outline: 0;
`
const IncrementButton = styled.button`
  background-color: transparent;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  outline: 0;
`

const Counter = styled.input`
  width: 50px;
  border: none;
  padding-left: 20px;
  outline: 0;
`
const DeleteButton = styled.button`
  background-color: transparent;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  margin-right: 20px;
  outline: 0;
`
const Img = styled.img`
    width: 50px;
    height: 100%;
    margin-left: 30px;
`

const ContentPosition = styled.div`
  width: 614px;
`
const NoProductImg = styled.img`
  display: flex;
  margin: auto;
  width: 300px;
  height: 100%;
`
const CartText = styled.h2`
  color: #2E384C;
  display: flex;
  justify-content: center;
  margin: 20px 0 0 20px;
`

const Cart = props => {
  const { onDelete, products = [] } = props
  const dispatch = useDispatch()
  const onAdd = (product, amount) => {
    return dispatch(setItemToCart(amount + 1, product))
  }
  const onSubtract = (product, amount) => {
    return dispatch(setItemToCart(amount - 1, product))
  }

  return (
    <div>
      <Container>
        {isEmpty(products) ? (
          <ContentPosition>
            <NoProductImg src={NoProductImage} alt="No Product" />
            <CartText>The cart is empty</CartText>
          </ContentPosition>
        ) : (
          <div>
            {products.map((product, key) => {
              const image = path(['image'], product)
              const name = path(['name'], product)
              const id = path(['id'], product)
              const price = path(['price'], product)
              const amount = path(['amount'], product)
              return (
                <Card key={key}>
                  <div>
                    <Img
                      src={NoImage}
                      alt="image"
                    />
                  </div>
                  <ProductName>{name}</ProductName>
                  <GroupButton>
                    <DecrementButton onClick={() => onSubtract(product, amount)}>
                      <MinusIcon />
                    </DecrementButton>
                    <Counter type="number" value={amount} />
                    <IncrementButton onClick={() => onAdd(product, amount)}>
                      <PlusIcon />
                    </IncrementButton>
                  </GroupButton>
                  <div>
                    {price}
                  </div>
                  <DeleteButton onClick={() => onDelete(id)}>
                    <DeleteIcon />
                  </DeleteButton>
                </Card>
              )
            })}
          </div>
        )}
      </Container>
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  onDelete: PropTypes.func
}
export default Cart
