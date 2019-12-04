import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { Container } from 'components/StyledElems'
import { Button } from 'components/UI/Button'
import ImageUpload from 'components/UI/ImageUpload/ImageUploadField'
import { FormField } from 'components/UI/FormField'
import { prop } from 'ramda'

const FieldWrapper = styled.div`
  margin-bottom: 20px;
`

const ChangePassword = styled.div`
  display: ${props => props.open ? 'block' : 'none'};
`
const PasswordButtonBlock = styled.div`
  display: flex;
`
const PasswordButton = styled.button`
  margin-left: ${props => props.open ? '0' : '15px'};
`
const SpanPassword = styled.span`
  display: ${props => props.open ? 'none' : 'block'};
`
const Profile = (props) => {
  const { onSubmit, initialValues } = props
  const [open, setOpen] = useState(false)
  return (
    <Container>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FieldWrapper>
              <Field
                name="image"
                component={ImageUpload}
              />
            </FieldWrapper>
            <FieldWrapper>
              {prop('phoneNumber', initialValues)}
            </FieldWrapper>
            <FieldWrapper>
              <Field
                label="Full Name"
                name="fullName"
                component={FormField}
                placeholder="Name"
              />
            </FieldWrapper>
            <h3>Пароль</h3>
            <PasswordButtonBlock>
              <SpanPassword open={open}>•••••••••</SpanPassword>
              <PasswordButton open={open} onClick={() => setOpen(!open)}>{open ? 'Отменить' : 'Изменить'}</PasswordButton>
            </PasswordButtonBlock>
            <ChangePassword open={open}>
              <FieldWrapper>
                <Field
                  name="password"
                  type="password"
                  component={FormField}
                  placeholder="Введите Пароль"
                />
              </FieldWrapper>
              <FieldWrapper>
                <Field
                  name="confirmPassword"
                  type="password"
                  component={FormField}
                  placeholder="Повторите Пароль"
                />
              </FieldWrapper>
              <Button>Сохранить</Button>
            </ChangePassword>
          </form>
        )}
      />
    </Container>
  )
}

export default Profile
