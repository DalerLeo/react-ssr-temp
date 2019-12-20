import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import DeliveryIcon from 'images/delivery.svg'
import WalletIcon from 'images/wallet.svg'
import Link from 'components/Link'
import { path } from 'ramda'

const CartInfoBlock = styled.div`
  padding: 20px 20px;
  border: 1px solid lightgrey;
  border-radius: 7px;
  position: fixed;
`
const CartInfoItem = styled.div`
  margin-bottom: 10px;
`
const ImgInfo = styled.img`
  width: 30px;
  margin-right: 10px;
`
const DeliveryBlock = styled.div`
  margin-bottom: 30px;
`
const WalletBlock = styled.div`
  margin-bottom: 30px;
`
const PriceBlock = styled.div`
  margin-top: 30px;
`
const PriceBlockItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`
const SubmitButton = styled.button`
  width: 100%;
  background-color: #C7F9DD;
  color: #13885F;
  outline: 0;
  border: none;
  border-radius: 7px;
  padding: 15px;
  cursor: pointer;
`
const CartInfo = props => {
  const { sumAll } = props
  return (
    <CartInfoBlock>
      <DeliveryBlock>
        <CartInfoItem><ImgInfo src={DeliveryIcon} />Бесплатная доставка по Ташкенту</CartInfoItem>
        <CartInfoItem>Дата доставки: с 05 по 06 дек.</CartInfoItem>
      </DeliveryBlock>
      <WalletBlock>
        <CartInfoItem><ImgInfo src={WalletIcon} />Любая форма оплаты</CartInfoItem>
        <CartInfoItem>Картой онлайн или наличными при получении</CartInfoItem>
      </WalletBlock>
      <hr />
      <PriceBlock>
        <PriceBlockItem>
          <div>Товары</div>
          <div>0 сум</div>
        </PriceBlockItem>
        <PriceBlockItem>
          <div>Доставка</div>
          <div>{sumAll} сум</div>
        </PriceBlockItem>
        <PriceBlockItem>
          <div>Итого</div>
          <div>{sumAll} сум</div>
        </PriceBlockItem>
      </PriceBlock>
      <Link to="/order">
        <SubmitButton>Оформить заказ</SubmitButton>
      </Link>
    </CartInfoBlock>
  )
}

CartInfo.propTypes = {
}
export default CartInfo
