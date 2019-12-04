import React from 'react'
import { Field, Form } from 'react-final-form'
import styled from 'styled-components'
import { Button } from 'components/UI/Button'
import { FormField } from 'components/UI/FormField'
import Modal from 'components/UI/Modal'
// Import MapCard from 'components/Maps'

const FieldWrapper = styled.div`
  margin-bottom: 20px;
`
const CreateAddressForm = (props) => {
  const { onSubmit, addAddress } = props
  return (
    <Modal>
      <h1>Добавить адрес</h1>
      <Form
        onSubmit={addAddress}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FieldWrapper>
              {/* <MapCard /> */}
            </FieldWrapper>
            <FieldWrapper>
              <Field
                name="location"
                type="text"
                placeholder="Укажите ардес на карте"
                label="Адрес доставки"
                component={FormField}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Field
                name="phoneNumber"
                type="number"
                placeholder="Укажите номер телефона"
                label="Номер телефона"
                component={FormField}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Field
                name="name"
                type="text"
                placeholder="Укажите свое имя"
                label="Имя"
                component={FormField}
              />
            </FieldWrapper>
            <Button type="submit">Сохранить</Button>
          </form>
        )}
      />
    </Modal>
  )
}

export default CreateAddressForm
