import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { pathOr, takeLast } from 'ramda'
import { CartUI, CartInfo } from 'components/Cart'
import { Col, Row } from 'components/Grid'
import Container from 'components/Container'

const Title = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 119.46%;
  color: #2E384C;
  mix-blend-mode: normal;
  margin: 30px 0;
`
const Cart = props => {
  const {
    onDelete,
    products,
    token
  } = props
  const productAmount = products.length
  let sumall = 0
  let summ = 0

  const totalPr = products.map((product) => {
    const productPrice = Number(pathOr(0, ['price'], product))
    const amount = pathOr(0, ['amount'], product)
    const totalProdPrice = productPrice * amount
    sumall += totalProdPrice
    return sumall
  })

  const totalAm = products.map((product) => {
    const productPrice = Number(pathOr(0, ['price'], product))
    summ += productPrice
    return summ
  })

  const totalAmount = takeLast(1, totalAm)
  const totalPrice = takeLast(1, totalPr)
  return (
    <Container>
      <Row>
        <Title>Корзина</Title>
      </Row>
      <Row gutter={24}>
        <Col span={18}>
          <CartUI products={products} onDelete={onDelete} />
        </Col>
        <Col span={6}>
          <CartInfo totalPrice={totalPrice} totalAmount={totalAmount} productAmount={productAmount} token={token} />
        </Col>
      </Row>
    </Container>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  onDelete: PropTypes.func
}

Cart.defaultProps = {
  products: []
}
export default Cart
