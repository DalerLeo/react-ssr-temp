import React from 'react'
import Container from 'components/StyledElems/Container'
import styled from 'styled-components'

const OrderId = styled.div`
  font-weight: 600;
font-size: 20px;
line-height: 164.57%;
span {
  color: ${props => props.theme.colors.primary.default}
}
`
const OrderDetail = (props) => {
  const { data, loading } = props
  return (
    <Container>
      <h1>Готово!</h1>
      <OrderId>Заказ <span>№{data.id}</span> оформлен</OrderId>

    </Container>
  )
}

export default OrderDetail
