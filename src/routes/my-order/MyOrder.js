import React from 'react'
import styled from 'styled-components'
import { pathOr } from 'ramda'
import Container from 'components/StyledElems/Container'

import MyOrderList from './MyOrderList'

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Title = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 119.46%;
  color: #2E384C;
  mix-blend-mode: normal;
  margin: 35px 0;
`

const MyOrder = (props) => {
  const { myOrderList } = props
  const orderList = pathOr([], ['data'], myOrderList)
  return (
    <Container>
      <Title>Мои заказы</Title>
      <CardContainer>
        {orderList.length === 0
          ? (<h2>Нет заказов</h2>)
          : (<MyOrderList myOrderList={myOrderList} />)}

      </CardContainer>
    </Container>
  )
}

export default MyOrder
