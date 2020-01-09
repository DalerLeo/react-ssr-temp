import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { OrderSelectField } from 'components/UI/FormField'
import Container from 'components/StyledElems/Container'
import { Col, Row } from 'components/Grid'
import { pathOr, takeLast, length } from 'ramda'
import YandexMapField from 'components/UI/FormField/Map/YandexMapField'
import Fields from 'components/UI/FormField/Fields'
import OrderInfo from '../../components/Cart/OrderInfo'
import SelectAddress from './components/SelectAddress'

const AddressInfo = styled.div`
  margin-right: 20px;
`
const MainTitle = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 119.46%;
  color: #2E384C;
  mix-blend-mode: normal;
  margin: 25px 0;
`
const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 164.57%;
  color: #2E384C;
  margin: 10px 0;
`

const Line = styled.div`
  border-bottom: 1px solid #EAEAEC;
  width: 95%;
  margin: 20px 0;
`

const ChangeAddress = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 129.96%;
  color: #2EBB8A;
  cursor: pointer;
  margin: 20px 0;
`

const SubmitButton = styled.button`
  width: 75%;
  color: #FFF;
  outline: 0;
  border: none;
  padding: 15px;
  cursor: pointer;
  background: #2EBB8A;
  border-radius: 4px;
  margin: 35px 0 14px 0;
`
const AgreeStatement = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;
  color: #818591;
  margin-bottom: 60px;
`

const MaxWidth = styled.div`
  max-width: 750px;
`
const EMPTY_ARR = []
const Order = props => {
  const {
    data,
    addresses,
    paymentTypes,
    onSubmit,
    products
  } = props

  const [isRadio, setIsRadio] = useState(true)
  const addressList = pathOr(EMPTY_ARR, ['data'], addresses)

  console.warn(addressList)
  const onToggle = () => setIsRadio(!isRadio)
  const productAmount = products.length
  let sumall = 0
  let summ = 0

  const totalPr = products.map((product) => {
    const productPrice = Number(pathOr(0, ['price'], product))
    const amount = pathOr(0, ['amount'], product)
    const totalProdPrice = productPrice * amount
    sumall += totalProdPrice
    return sumall
  })

  const totalAm = products.map((product) => {
    const productPrice = Number(pathOr(0, ['price'], product))
    summ += productPrice
    return summ
  })

  const totalAmount = takeLast(1, totalAm)
  const priceWithoutDel = takeLast(1, totalPr)
  return (
    <Container>
      <MainTitle>Оформление заказа</MainTitle>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, values, form }) => {
          const deliveryPrice = pathOr(0, ['dealType', 'price'], values)

          const totalPrice = Number(priceWithoutDel) + Number(deliveryPrice)

          return (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col span={18}>
                  <MaxWidth>
                    <Title>Адрес доставки</Title>
                    <AddressInfo>
                      {isRadio ? (
                        <div>
                          <SelectAddress addressList={addressList} values={values} form={form} />
                          <ChangeAddress onClick={onToggle}>Указать другой адрес</ChangeAddress>
                        </div>
                      ) : (
                        <>
                          <Fields
                            names={[
                              'address.location',
                              'address.address',
                              'address.phone',
                              'address.contactPerson',
                              'address.referencePoint'
                            ]}
                          >
                            {(fields) => {
                              return <YandexMapField fields={fields} />
                            }}
                          </Fields>
                          <ChangeAddress onClick={onToggle}>
                            Есть сохраненные адреса: {length(addressList)}
                          </ChangeAddress>
                        </>
                      )}
                    </AddressInfo>

                    <Line />
                    <Row>
                      <Title>Способ доставки</Title>
                    </Row>
                    <Row>
                      <AddressInfo>
                        <Field
                          name="dealType"
                          data={data}
                          component={OrderSelectField}
                        />
                      </AddressInfo>
                    </Row>
                    <Line />
                    <Row>
                      <AddressInfo>
                        <Title>Способ оплаты</Title>
                        <Field
                          name="paymentType"
                          data={paymentTypes}
                          component={OrderSelectField}
                        />
                      </AddressInfo>
                    </Row>
                    <SubmitButton type="submit">Оформить заказ</SubmitButton>
                    <AgreeStatement>
                    Нажав «Перейти к оплате», вы соглашаетесь с условиями использования сервиса «LOCHIN».
                    </AgreeStatement>
                  </MaxWidth>
                </Col>
                <Col span={6}>
                  <OrderInfo
                    totalAmount={totalAmount}
                    totalPrice={totalPrice}
                    productAmount={productAmount}
                    deliveryPrice={deliveryPrice}
                  />
                </Col>
              </Row>
            </form>
          )
        }}
      />
    </Container>
  )
}

export default Order
