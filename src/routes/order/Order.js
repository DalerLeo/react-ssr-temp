import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { OrderSelectField, FormField } from 'components/UI/FormField'
import Container from 'components/Container'
import { Col, Row } from 'components/Grid'
import { pathOr, add, path } from 'ramda'
import LocationIcon from 'icons/Location'
import Modal from 'components/UI/Modal'
import { YMaps, Map, GeoObject, Placemark } from 'react-yandex-maps'
import CartInfo from '../../components/Cart/CartInfo'
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
  margin-bottom: 25px;
`
const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 164.57%;
  color: #2E384C;
  margin: 10px 0;
`

const Address = styled.div`
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px #efefef solid;
  display: inline-block;
  margin-right: 10px;
  background: #fff;
  cursor: pointer;
  border-color: ${props => props.isActive && props.theme.colors.primary.default};
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
const EMPTY_ARR = []
const Order = props => {
  const {
    data,
    addresses,
    paymentTypes,
    onSubmit
  } = props

  const [isRadio, setIsRadio] = useState(true)
  const [numDisabled, setNumDisabled] = useState(true)
  const addressList = pathOr(EMPTY_ARR, ['data'], addresses)

  return (
    <Container>
      <MainTitle>Оформление заказа</MainTitle>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, values, form }) => {
          const deliveryPrice = pathOr(0, ['delivery', 'price'], values)
          const sumAll = add(deliveryPrice, 0)

          return (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col span={18}>
                  <Title>Адрес доставки</Title>
                  <AddressInfo>
                    {isRadio ? (
                      <div>
                        <SelectAddress addressList={addressList} />
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
                            <Modal>
                              <YMaps>
                                <Map
                                  defaultState={{
                                    center: [41.311151, 69.279737],
                                    zoom: 11,
                                  }}
                                >
                                  <GeoObject
                                    // The geometry description.
                                    geometry={{
                                      type: 'Point',
                                      coordinates: [55.8, 37.8],
                                    }}
                                    // Properties.
                                    properties={{
                                      // The placemark content.
                                      iconContent: 'Я тащусь',
                                      hintContent: 'Ну давай уже тащи',
                                    }}
                                    // Options.
                                    options={{
                                      // The placemark's icon will stretch to fit its contents.
                                      preset: 'islands#blackStretchyIcon',
                                      // The placemark can be moved.
                                      draggable: true,
                                    }}
                                  />
                                  {/* <Placemark
                                    geometry={{
                                      coordinates: [55.751574, 37.573856]
                                    }}
                                    properties={{
                                      hintContent: 'Собственный значок метки',
                                      balloonContent: 'Это красивая метка'
                                    }}
                                    options={{
                                      iconLayout: 'default#image',
                                      iconImageHref: 'images/myIcon.gif',
                                      iconImageSize: [30, 42],
                                      iconImageOffset: [-3, -42]
                                    }}
                                  /> */}
                                </Map>
                              </YMaps>
                            </Modal>
                          </LocationBlock>
                        </Col>
                      </Row>
                    )}
                    <Title>Контактные данные</Title>
                    <Row>
                      <Col span={11}>
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
                      <Col span={2} />
                      <Col span={11}>
                        <FieldWrap>
                          <Field
                            name="address.contactPerson"
                            component={FormField}
                            placeholder="Имя"
                          />
                        </FieldWrap>
                      </Col>
                    </Row>
                    {addressList.map(address => (
                      <Address
                        key={address.id}
                        isActive={address.id === path(['address', 'id'], values)}
                        onClick={() => form.change('address', address)}
                      >
                        {address.address}
                      </Address>
                    ))}
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
                </Col>
                <Col span={6}>
                  <CartInfo sumAll={sumAll} order={true} />
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
