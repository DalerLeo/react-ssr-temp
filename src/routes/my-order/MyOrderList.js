import React from 'react'
import styled from 'styled-components'
import { pathOr, path } from 'ramda'
import { Row, Col } from 'components/Grid'
import accept from 'icons/accept.svg'
import onway from 'icons/onway.svg'
import reject from 'icons/reject.svg'
import MyOrderProducts from './components/MyOrderProducts'
import MyOrderDetails from './components/MyOrderDetails'

const MyOrders = styled.div`
  background: #FFFFFF;
  border: 1px solid #EAEAEC;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 15px 30px;
  width: 1150px;
  margin-bottom: 32px;
`
const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
`
const OrderId = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 164.57%;
  color: #2E384C;
`
const OrderStatus = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 164.57%;
  text-align: right;
  color: #2E384C;
`
const Line = styled.div`
  border-bottom: 1px solid #EAEAEC;
  margin: 17px  0 35px 0;
`
const MyOrderList = (props) => {
  const { myOrderList } = props
  const data = pathOr([], ['data'], myOrderList)
  return (
    <div>
      {data.map((item, key) => {
        const productItem = pathOr([], ['orderProducts'], item)
        const orderId = path(['id'], item)
        return (
          <MyOrders key={key}>
            <OrderHeader>
              <OrderId>Заказ № {orderId}</OrderId>
              <OrderStatus>
                <img src={accept} alt="accept" />
                <img src={onway} alt="accept" />
                <img src={reject} alt="accept" />
                {item.status}
              </OrderStatus>
            </OrderHeader>
            <Line />
            <Row>
              <Col span={10}>
                <MyOrderProducts productItem={productItem} />
              </Col>
              <Col span={2} />
              <Col span={12}>
                <MyOrderDetails item={item} />
              </Col>
            </Row>
          </MyOrders>
        )
      })}

    </div>
  )
}

export default MyOrderList
