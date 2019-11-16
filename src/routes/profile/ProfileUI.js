import React from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { Container } from 'components/StyledElems'
import { Button } from 'components/UI/Button'
import ImageUpload from 'components/UI/ImageUpload/ImageUploadField'
import { FormField } from 'components/UI/FormField'
import {prop} from 'ramda'
const FieldWrapper = styled.div`
  margin-bottom: 20px;
`

const Profile = (props) => {
  const { onSubmit, initialValues } = props
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
                type="text"
                component={FormField}
                placeholder="Name"
              />
            </FieldWrapper>
            <FieldWrapper>
              <Field
                label="Password"
                name="password"
                type="password"
                component={FormField}
                placeholder="Password"
              />
            </FieldWrapper>
            <FieldWrapper>
              <Field
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                component={FormField}
                placeholder="Confirm Password"
              />
            </FieldWrapper>
            <Button>Сохранить</Button>
          </form>
        )}
      />
    </Container>
  )
}

export default Profile
