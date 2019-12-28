import React from 'react'
import styled from 'styled-components'
import Container from 'components/StyledElems/Container'

import MyOrderList from './MyOrderList'

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const MyOrder = (props) => {
  const { myOrderList } = props
  return (
    <Container>
      <h1>Мои заказы</h1>
      <CardContainer>
        <MyOrderList myOrderList={myOrderList} />
      </CardContainer>
    </Container>
  )
}

export default MyOrder
