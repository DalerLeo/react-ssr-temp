import React from 'react'
import styled from 'styled-components'
import Link from 'components/Link'
import Payme from 'icons/Payme.svg'
import Click from 'icons/Click.svg'
import Cash from 'icons/Cash.svg'
import { path } from 'ramda'

const CartInfoBlock = styled.div`
  background: #FFF;
  padding: 25px 20px;
  border-radius: 7px;
  
  width: 290px;
`
const CartInfoItem = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 164.57%;
  color: #2E384C;
`
const CartInfoItem1 = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;
  color: #818591;
`

const DeliveryBlock = styled.div`
  margin-bottom: 30px;
`
const WalletBlock = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
`
const PriceBlock = styled.div`
  margin-top: 30px;
`
const PriceBlockItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`
const PriceTotalBlock = styled(PriceBlockItem)`
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 164.57%;
    color: #2E384C;
`
const SubmitButton = styled.button`
  width: 100%;
  color: #FFF;
  outline: 0;
  border: none;
  padding: 15px;
  cursor: pointer;
  background: #2EBB8A;
  border-radius: 4px;
`
const Line = styled.div`
  border-bottom: 1px solid #EAEAEC;
  margin-bottom: 15px;
`
const CartInfo = props => {
  const { totalPrice, totalAmount, productAmount, deliveryPrice, token } = props
  const tokenToCheck = path(['data', 'token'], token)
  const hasToken = typeof tokenToCheck === 'undefined'

  return (
    <CartInfoBlock>
      <DeliveryBlock>
        <CartInfoItem>Любая форма оплаты</CartInfoItem>
        <CartInfoItem1>Картой онлайн или наличными при получении</CartInfoItem1>
      </DeliveryBlock>
      <WalletBlock>
        <img src={Payme} alt="Payme" />
        <img src={Click} alt="Click" />
        <img src={Cash} alt="Cash" />
      </WalletBlock>
      <Line />
      <PriceBlock>
        <PriceBlockItem>
          <div>Товары({productAmount})</div>
          <div>{totalPrice} сум</div>
        </PriceBlockItem>
        <PriceBlockItem>
          <div>Скидка на товары(0)</div>
          <div> 0 сум</div>
        </PriceBlockItem>
        <PriceBlockItem>
          <div>Доставка</div>
          <div>{Number.isInteger(deliveryPrice) ? deliveryPrice : '0'} сум</div>
        </PriceBlockItem>
        <Line />
        <PriceTotalBlock>
          <div>Итого</div>
          <div>{totalPrice} сум</div>
        </PriceTotalBlock>
      </PriceBlock>
      {
        hasToken ? (
          <Link to="/sign-in">
            <SubmitButton> Регистрация</SubmitButton>
          </Link>
        ) : (
          <Link to="/order">
            <SubmitButton>Оформить заказ</SubmitButton>
          </Link>
        )
      }
    </CartInfoBlock>
  )
}

CartInfo.propTypes = {
}
export default CartInfo
