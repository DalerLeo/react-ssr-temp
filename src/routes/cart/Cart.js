import React from 'react'
import PropTypes from 'prop-types'
import { pathOr, takeLast } from 'ramda'
import { CartUI, CartInfo } from 'components/Cart'
import { Col, Row } from 'components/Grid'
import Container from 'components/Container'

const Cart = props => {
  const {
    onDelete,
    products
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
        <Col span={16}>
          <CartUI products={products} onDelete={onDelete} />
        </Col>
        <Col span={8}>
          <CartInfo totalPrice={totalPrice} totalAmount={totalAmount} productAmount={productAmount} />
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
