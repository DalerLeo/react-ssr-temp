import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { CartUI } from 'components/Cart'
import CartInfo from 'components/Cart/CartInfo'
import { Col, Row } from 'components/Grid'
import Container from 'components/Container'

const Cart = props => {
  const { onDelete, products = [] } = props
  return (
    <Container>
      <Row>
        <Col span={16}>
          <CartUI products={products} onDelete={onDelete} />
        </Col>
        <Col span={8}>
          <CartInfo />
        </Col>
      </Row>
    </Container>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  onDelete: PropTypes.func
}
export default Cart
