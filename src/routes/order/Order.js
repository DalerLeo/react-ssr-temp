import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Methods from 'components/UI/Methods'
import Container from 'components/Container'
import CartInfo from '../../components/Cart/CartInfo'

const MainBlock = styled.div`
  display: flex;
`
const AddressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 740px;
  margin-right: 20px;
`
const AddressInfoTitle = styled.div`
  margin-bottom: 20px;
`
const Order = props => {
  const {data} = props
  console.warn(data)
  return (
    <Container>
      <AddressInfoTitle>Оформление заказа</AddressInfoTitle>
      <AddressInfoTitle>Способ доставки</AddressInfoTitle>
      <MainBlock>
        <div>
          <AddressInfo>
            <Methods data={data} />
          </AddressInfo>
          <hr style={{ width: '95%' }} />
        </div>
        <CartInfo />
      </MainBlock>

      <AddressInfoTitle>Способ доставки</AddressInfoTitle>
      <MainBlock>
        <AddressInfo>
          <Methods data={data} />
        </AddressInfo>
      </MainBlock>
    </Container>
  )
}

Order.propTypes = {
}
export default Order
