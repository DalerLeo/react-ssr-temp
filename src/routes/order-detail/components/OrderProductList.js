import React from 'react'
import styled from 'styled-components'
import { path, pathOr, find, propEq } from 'ramda'
import { Col, Row } from 'components/Grid'
import NoImage from 'images/NoImage.png'

const NameStyled = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 129.96%;
    color: #242F3B;
    mix-blend-mode: normal;
    flex: none;
    order: 0;
    align-self: center;
    align-items: center;
`
const AmountStyled = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 129.96%;
    color: #242F3B;
    mix-blend-mode: normal;
`
const PriceStyled = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 129.96%;
    text-align: right;
    color: #242F3B;
    mix-blend-mode: normal;
`
const ImageStyled = styled.img`
    height: 89px;
    width: 100px;
`
const Line = styled.div`
    border: 0.5px solid #E7E8EA;
    margin: 17px 0 15px 0;
`
const IdStyled = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 129.96%;
    color: #818591;
    flex: none;
    order: 1;
    align-self: flex-start;
    margin-top: 6px;
`
const OrderProductList = (props) => {
  const { orderProducts } = props
  return (
    <Row>
      <Col span={16}>
        {orderProducts.map((orderProductsItem, key) => {
          const price = path(['price'], orderProductsItem)
          const amount = path(['amount'], orderProductsItem)
          const name = path(['product', 'name'], orderProductsItem)
          const id = path(['product', 'id'], orderProductsItem)
          const images = pathOr([], ['product', 'images'], orderProductsItem)
          const isPrimary = find(propEq('isPrimary', true))(images)
          const image = path(['image'], isPrimary)
          return (
            <div key={key}>
              <Row>
                <Col span={4}><ImageStyled src={typeof image === 'undefined' ? NoImage : image} alt="product" /></Col>
                <Col span={14}><NameStyled>{name} <IdStyled>#{id}</IdStyled></NameStyled></Col>
                <Col span={3}><AmountStyled>{amount} шт.</AmountStyled></Col>
                <Col span={3}><PriceStyled>{price} сум</PriceStyled></Col>
              </Row>
              <Line />
            </div>
          )
        })}
      </Col>
      <Col span={8} />
    </Row>
  )
}

export default OrderProductList
