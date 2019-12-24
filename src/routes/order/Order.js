import React from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { OrderSelectField, FormField } from 'components/UI/FormField'
import Container from 'components/Container'
import { Col, Row } from 'components/Grid'
import { pathOr, add, path } from 'ramda'
import CartInfo from '../../components/Cart/CartInfo'

const FieldWrap = styled.div`
  margin-bottom: 20px;
`
const AddressInfo = styled.div`
  margin-right: 20px;
`
const Title = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 40px;
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
const EMPTY_ARR = []
const Order = props => {
  const {
    data,
    addresses,
    paymentTypes,
    onSubmit
  } = props


  const addressList = pathOr(EMPTY_ARR, ['data'], addresses)


  return (
    <Container>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, values, form }) => {
          const deliveryPrice = pathOr(0, ['delivery', 'price'], values)
          const sumAll = add(deliveryPrice, 0)

          return (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col span={16}>
                  <Title>Адрес доставки</Title>
                  <AddressInfo>
                    <FieldWrap>
                      <Field
                        label="Адрес"
                        name="address.address"
                        component={FormField}
                      />
                    </FieldWrap>
                    <FieldWrap>
                      <Field
                        label="Номер телефона"
                        name="address.phone"
                        component={FormField}
                      />
                    </FieldWrap>
                    <FieldWrap>
                      <Field
                        label="Имя"
                        name="address.contactPerson"
                        component={FormField}
                      />
                    </FieldWrap>
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
                  <Title>Способ доставки</Title>
                  <AddressInfo>
                    <Field
                      name="dealType"
                      data={data}
                      component={OrderSelectField}
                    />
                  </AddressInfo>
                  <AddressInfo>
                    <Title>Способ оплаты</Title>

                    <Field
                      name="paymentType"
                      data={paymentTypes}
                      component={OrderSelectField}
                    />
                  </AddressInfo>
                </Col>
                <Col span={8}>
                  <CartInfo sumAll={sumAll} order={true}/>
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
