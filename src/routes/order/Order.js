import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { OrderSelectField, FormField } from 'components/UI/FormField'
import Container from 'components/StyledElems/Container'
import { Col, Row } from 'components/Grid'
import { pathOr, path, takeLast } from 'ramda'
import LocationIcon from 'icons/Location'
import { YMaps, Map, GeoObject, Placemark } from 'react-yandex-maps'
import Link from 'components/Link'
import OrderInfo from '../../components/Cart/OrderInfo'
import SelectAddress from './components/SelectAddress'

const FieldWrap = styled.div`
  margin-bottom: 20px;
`
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
const LocationBlock = styled.div`
  margin-top: 25px;
  display: flex;
  cursor: pointer;
`
const LocationText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 129.96%;
  text-align: center;
  color: #2E384C;
  margin-left: 5px;
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
const ShowNumber = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 129.96%;
  text-align: right;
  color: #2EBB8A;
`
const ForCarrier = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 129.96%;
  text-align: right;
  color: #818591;
`
const NumBlock = styled.div`
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;
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
  const [numDisabled, setNumDisabled] = useState(true)
  const addressList = pathOr(EMPTY_ARR, ['data'], addresses)

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
                  <Title>Адрес доставки</Title>
                  <AddressInfo>
                    {isRadio ? (
                      <div>
                        <SelectAddress addressList={addressList} values={values} form={form} />
                        <ChangeAddress onClick={() => setIsRadio(!isRadio)}>Указать другой адрес</ChangeAddress>
                      </div>
                    ) : (
                      <Row>
                        <Col span={12}>
                          <FieldWrap>
                            <Field
                              name="address.address"
                              component={FormField}
                              placeholder="Введите или выберите на карте адрес доставки"
                            />
                          </FieldWrap>
                        </Col>
                        <Col span={1} />
                        <Col span={11}>
                          <LocationBlock>
                            <LocationIcon />
                            <LocationText>Указать на карте</LocationText>
                          </LocationBlock>
                        </Col>
                      </Row>
                    )}
                    <Title>Контактные данные</Title>
                    <Row>
                      <Col span={7}>
                        <FieldWrap>
                          <Field
                            name="address.phone"
                            component={FormField}
                            placeholder="Номер телефона"
                            disabled={numDisabled}
                          />
                        </FieldWrap>
                        <NumBlock onClick={() => setNumDisabled(!numDisabled)}>
                          <ShowNumber>Изменить номер</ShowNumber><ForCarrier>(для курьера)</ForCarrier>
                        </NumBlock>
                      </Col>
                      <Col span={1} />
                      <Col span={10}>
                        <FieldWrap>
                          <Field
                            name="address.contactPerson"
                            component={FormField}
                            placeholder="Имя"
                          />
                        </FieldWrap>
                      </Col>
                      <Col span={6} />
                    </Row>
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
                  <Row>
                    <SubmitButton type="submit">Оформить заказ</SubmitButton>
                  </Row>
                  <Row>
                    <AgreeStatement>
                    Нажав «Перейти к оплате», вы соглашаетесь с условиями использования сервиса «LOCHIN».
                    </AgreeStatement>
                  </Row>
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
