import React, { useState } from 'react'
import styled from 'styled-components'
import { prop } from 'ramda'
import { Field } from 'react-final-form'
import InputField from '../FormField'
import { Row, Col } from '../../../Grid'
import { FieldWrapper } from '../../../StyledElems'
import AddressField from './AddressField'
import YandexMap from './YandexMap'

const RowUI = styled(Row)`
  margin-top: 20px;
`

const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 164.57%;
  color: #2E384C;
  margin: 10px 0;
`

const YandexMapField = props => {
  const [open, setOpen] = useState(false)

  const { fields } = props

  const addressInputs = prop('address.address', fields)
  const locationInputs = prop('address.location', fields)
  const onAddressChange = addressInputs.input.onChange
  const addressValue = addressInputs.input.value
  const onOpenToggle = () => setOpen(!open)
  return (
    <>
      <FieldWrapper>
        <Field
          name="address.address"
          component={AddressField}
          onIconClick={onOpenToggle}
        />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          name="address.referencePoint"
          label="ориентир"
          component={InputField}
        />
      </FieldWrapper>
      <Title>Контактные данные</Title>
      <RowUI gutter={20}>
        <Col span={12}>
          <Field
            name="address.phone"
            label="Номер телефона"
            component={InputField}
          />
        </Col>
        <Col span={12}>
          <Field
            name="address.contactPerson"
            label="Имя"
            component={InputField}
          />
        </Col>
      </RowUI>
      <YandexMap
        {...locationInputs}
        onToggle={onOpenToggle}
        open={open}
        addressValue={addressValue}
        onAddressChange={onAddressChange}
      />
    </>
  )
}

export default YandexMapField
