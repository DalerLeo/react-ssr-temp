import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import CartUI from 'components/Cart'
import CartInfo from 'components/Cart/CartInfo'

const CartBlock = styled.div`
  display: flex;
  justify-content: center;
`
const Card = styled.div`
    background-color: #FFF;
    width: 390px;
    height: auto;
    border-radius: 7px;
    margin-right: 30px;
`

const Cart = props => {
  const { onDelete, products = [] } = props
  return (
    <CartBlock>
      <CartUI products={products} onDelete={onDelete} />
      <Card>
        <CartInfo />
      </Card>
    </CartBlock>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  onDelete: PropTypes.func
}
export default Cart
