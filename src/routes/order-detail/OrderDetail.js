import React from 'react'
import Container from 'components/StyledElems/Container'
import { path, pathOr } from 'ramda'
import styled from 'styled-components'
import { Row, Col } from 'components/Grid'
import OrderProductList from './components/OrderProductList'

const OrderId = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 164.57%;
  margin-bottom: 27px;
  span {
    color: ${props => props.theme.colors.primary.default}
  }
`
const DetailNames = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 129.96%;
  color: #818591;
  mix-blend-mode: normal;
  margin-bottom: 20px;
`
const DetailValue = styled.div`
  display: flex;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 129.96%;
  color: #2E384C;
  mix-blend-mode: normal;
`
const Line = styled.div`
  border: 0.5px solid #EAEAEC;
  margin: 5px 0 20px 0;
`
const DeliveryValue = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 129.96%;
  color: #2E384C;
  mix-blend-mode: normal;
`
const InReceive = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 129.96%;
  color: #818591;
  mix-blend-mode: normal;
  display: ${props => props.paymentType === 'cash' ? 'block' : 'none'}
`
const PriceValue = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 129.96%;
  color: #249E74;
  mix-blend-mode: normal;
`
const OrderDetail = (props) => {
  const { data, loading } = props
  const orderId = path(['id'], data)
  const address = path(['address', 'address'], data)
  const phone = path(['address', 'phone'], data)
  const name = path(['address', 'contactPerson'], data)
  const deliveryType = path(['dealType'], data)
  const paymentType = path(['paymentType'], data)
  const totalPrice = path(['totalPrice'], data)
  const orderProducts = pathOr([], ['orderProducts'], data)
  return (
    <Container>
      <h1>Готово!</h1>
      <OrderId>Заказ <span>№{orderId}</span> оформлен</OrderId>
      <Row>
        <Col span={4}>
          <DetailNames>Адрес доставки</DetailNames>
        </Col>
        <Col span={8}>
          <DetailValue>{address}</DetailValue>
        </Col>
        <Col span={12} />
      </Row>
      <Row>
        <Col span={4}>
          <DetailNames>Данные получателя</DetailNames>
        </Col>
        <Col span={8}>
          <DetailValue>+{phone}, {name}</DetailValue>
        </Col>
        <Col span={12} />
      </Row>
      <Row>
        <Col span={12}>
          <Line />
        </Col>
        <Col span={12} />
      </Row>
      <Row>
        <Col span={4}>
          <DetailNames>Тариф доставки</DetailNames>
        </Col>
        <Col span={8}>
          <DeliveryValue>{deliveryType}</DeliveryValue>
        </Col>
        <Col span={12} />
      </Row>
      <Row>
        <Col span={4}>
          <DetailNames>Способ оплаты</DetailNames>
        </Col>
        <Col span={8}>
          <DetailValue>{paymentType}<InReceive paymentType={paymentType}>(при получении)</InReceive></DetailValue>
        </Col>
        <Col span={12} />
      </Row>
      <Row>
        <Col span={4}>
          <DetailNames>Сумма заказа</DetailNames>
        </Col>
        <Col span={8}>
          <PriceValue>{totalPrice} сум</PriceValue>
        </Col>
        <Col span={12} />
      </Row>
      {/* <Row>
        <Col span={12}>
          <Line />
        </Col>
        <Col span={12} />
      </Row>
      <Row>
        <Col span={6}>
          <DetailNames>Дата доставки</DetailNames>
        </Col>
        <Col span={6}>
          <DetailValue>31 янв 2019г.</DetailValue>
        </Col>
        <Col span={6} />
      </Row>
      <Row>
        <Col span={12}>
          <Line />
        </Col>
        <Col span={12} />
      </Row> */}
      <h1>Заказанные товары</h1>
      <OrderProductList orderProducts={orderProducts} />
    </Container>
  )
}

export default OrderDetail
