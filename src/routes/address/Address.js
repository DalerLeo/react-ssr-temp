import React from 'react'
import { Field, Form } from 'react-final-form'
import styled from 'styled-components'
import { Button } from 'components/UI/Button'
import { FormField } from 'components/UI/FormField'
import Container from 'components/StyledElems/Container'
import Modal from 'components/UI/Modal'

const CardContainer = styled.div`
  display: flex;
`
const FieldWrapper = styled.div`
  margin-bottom: 20px;
`
const Profile = (props) => {
  const { onSubmit, addAddress} = props
  return (
    <Container>
      <h1>Мои заказы</h1>
      <CardContainer>
        <Modal>
          <h1>Добавить адрес</h1>
          <Form
            onSubmit={addAddress}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
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
      </CardContainer>
    </Container>
  )
}

export default Profile
