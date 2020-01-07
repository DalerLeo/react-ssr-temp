import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { Container } from 'components/StyledElems'
import { Button } from 'components/UI/Button'
import ImageUpload from 'components/UI/ImageUpload/ImageUploadField'
import { FormField } from 'components/UI/FormField'
import { prop, path, pathOr } from 'ramda'
import DeleteIcon from 'icons/Delete'
import { useDispatch } from 'react-redux'
import { updateClientAction } from './actions'

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
const UserInfo = styled.div`
  display: flex;
  margin-bottom: 20px;
`
const UserNamePhone = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 129.96%;
  color: #818591;
  mix-blend-mode: normal;
  width: 135px;
`
const UserNamePhoneValue = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 129.96%;
  color: #2E384C;
  mix-blend-mode: normal;
  margin-left: 58px;
`
const Line = styled.div`
  border-bottom: 1px solid #EAEAEC;
  width: 100%;
  margin: 30px 0;
`

const Line1 = styled.div`
  border-bottom: 1px solid #EAEAEC;
  width: 100%;
  margin-top: 15px;
`
const Address = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 164.57%;
  color: #2E384C;
`
const AdressInfoBlock = styled.div`
  border-bottom: 1px solid #EAEAEC;
  padding: 14px 0;
`
const AddressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 164.57%;
  color: #2E384C;
`
const AddPhoneNameBlock = styled.div`
  display: flex;
`
const AddPhoneNameInfo = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #818591;
  margin-right: 16px;
`
const DeleteButton = styled.div`
  cursor: pointer;
`
const Profile = (props) => {
  const { initialValues, onDelete, listAddress, onPhotoUpdate } = props

  const phoneNumber = path(['phoneNumber'], initialValues)
  const addressList = pathOr([], ['data'], listAddress)

  // Const [open, setOpen] = useState(false)

  return (
    <Form
      onSubmit={() => null}
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FieldWrapper>
            <Field
              name="photo"
              component={ImageUpload}
              onSuccess={onPhotoUpdate}
            />
          </FieldWrapper>
          <UserInfo>
            <UserNamePhone>Имя и фамилия</UserNamePhone>
            <UserNamePhoneValue>Руслан Набеев</UserNamePhoneValue>
          </UserInfo>
          <UserInfo>
            <UserNamePhone>Телефон</UserNamePhone>
            <UserNamePhoneValue>{phoneNumber}</UserNamePhoneValue>
          </UserInfo>
          <Line />
          <Address>Адрес доставки</Address>
          <Line1 />
          {addressList.map((address, key) => {
            const add = path(['address'], address)
            const phone = path(['phone'], address)
            const contactPerson = path(['contactPerson'], address)
            return (
              <AdressInfoBlock key={key}>
                <AddressInfo>
                  <div>{add}</div>
                  <DeleteButton onClick={() => onDelete(address.id)}>
                    <DeleteIcon />
                  </DeleteButton>
                </AddressInfo>
                <AddPhoneNameBlock>
                  <AddPhoneNameInfo>{phone}</AddPhoneNameInfo>
                  <AddPhoneNameInfo>{contactPerson}</AddPhoneNameInfo>
                </AddPhoneNameBlock>
              </AdressInfoBlock>
            )
          })}
          {/* <FieldWrapper>
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
          </ChangePassword> */}
        </form>
      )}
    />
  )
}

export default Profile
