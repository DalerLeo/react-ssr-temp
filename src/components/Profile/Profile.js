import React from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { Container } from 'components/StyledElems'
import { Button } from 'components/UI/Button'
import ImageUpload from '../UI/ImageUpload/ImageUploadField'
import { FormField } from '../UI/FormField'

const FieldWrapper = styled.div`
  margin-bottom: 20px;
`
const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}
const Profile = (props) => {
  return (
    <Container>
      <Form
        onSubmit={onSubmit}
        initialValues={{ stooge: 'larry', employed: false }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <FieldWrapper>
              <Field
                name="image"
                component={ImageUpload}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Field
                label="Name"
                name="firstName"
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
