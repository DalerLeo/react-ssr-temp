import React from 'react'
import styled from 'styled-components'
import { path } from 'ramda'
import { dateTimeFormat } from 'utils/dateFormat'
import numberFormat from 'utils/numberFormat'

const ProductDetailBlock = styled.div`
    display: flex;
    margin-bottom: 20px;
`
const ProductDetailName = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 129.96%;
    color: #818591;
    mix-blend-mode: normal;
    width: 200px;
`
const ProductDetailValue = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 129.96%;
    color: #2E384C;
    mix-blend-mode: normal;
`
const Line = styled.div`
    border-bottom: 1px solid #EAEAEC;
    margin: 25px 0;
`
const PriceBlock = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 129.96%;
    color: #249E74;
    mix-blend-mode: normal;
    margin-top: -5px;
`
const MyOrderDetails = (props) => {
  const { item } = props
  const address = path(['address', 'address'], item)
  const orientir = path(['address', 'referencePoint'], item)
  const name = path(['client', 'fullName'], item)
  const phone = path(['client', 'phoneNumber'], item)
  const delivery = path(['deliveryType', 'name'], item)
  const payment = path(['paymentType'], item)
  const totalPrice = path(['totalPrice'], item)
  const date = path(['createdDate'], item)
  return (
    <>
      <ProductDetailBlock>
        <ProductDetailName>
        Адрес доставки
        </ProductDetailName>
        <ProductDetailValue>
          {address} - ({orientir})
        </ProductDetailValue>
      </ProductDetailBlock>
      <ProductDetailBlock>
        <ProductDetailName>
        Данные получателя
        </ProductDetailName>
        <ProductDetailValue>
          {phone}, {name}
        </ProductDetailValue>
      </ProductDetailBlock>
      <Line />
      <ProductDetailBlock>
        <ProductDetailName>
        Тариф доставки
        </ProductDetailName>
        <ProductDetailValue>
          {delivery}
        </ProductDetailValue>
      </ProductDetailBlock>
      <ProductDetailBlock>
        <ProductDetailName>
        Способ оплаты
        </ProductDetailName>
        <ProductDetailValue>
          {payment}
        </ProductDetailValue>
      </ProductDetailBlock>
      <ProductDetailBlock>
        <ProductDetailName>
        Сумма заказа
        </ProductDetailName>
        <ProductDetailValue>
          <PriceBlock>{numberFormat(totalPrice)} сум</PriceBlock>
        </ProductDetailValue>
      </ProductDetailBlock>
      <Line />
      <ProductDetailBlock>
        <ProductDetailName>
        Дата доставки
        </ProductDetailName>
        <ProductDetailValue>
          {dateTimeFormat(date)}
        </ProductDetailValue>
      </ProductDetailBlock>
    </>
  )
}

export default MyOrderDetails
