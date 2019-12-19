import React from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { OrderSelectField } from 'components/UI/FormField'
import Container from 'components/Container'
import { Col, Row } from 'components/Grid'
import { pathOr, add } from 'ramda'
import CartInfo from '../../components/Cart/CartInfo'

const AddressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 20px;
`
const AddressInfoTitle = styled.div`
  margin-bottom: 20px;
`
const Order = props => {
  const { data } = props
  return (
    <Container>
      <Row>
        <AddressInfoTitle>Способ доставки</AddressInfoTitle>
      </Row>
      <Form
        onSubmit={() => ''}
        render={({ handleSubmit, values }) => {
          const deliveryPrice = pathOr(0, ['delivery', 'price'], values)
          const sumAll = add(deliveryPrice, 0)
          return (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col span={16}>
                  <Row>
                    <AddressInfo>
                      <Field
                        name="delivery"
                        data={data}
                        component={OrderSelectField}
                      />
                    </AddressInfo>
                  </Row>
                  <hr style={{ width: '97%' }} />
                </Col>
                <Col span={8}>
                  <CartInfo sumAll={sumAll} />
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
