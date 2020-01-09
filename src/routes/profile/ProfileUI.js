import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { path, pathOr } from 'ramda'
import { Form, Field } from 'react-final-form'
import ImageUpload from 'components/UI/ImageUpload/ImageUploadField'
import DeleteIcon from 'icons/Delete'
import Tick from 'icons/tick.svg'

const FieldWrapper = styled.div`
  margin-bottom: 20px;
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
const EditName = styled.div`
  margin-left: 10px;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 129.96%;

  text-align: right;
  color: #249E74;
`
const NameField = styled.input`
  margin-top: -2px;
  padding: 5px 10px;
  background: white;
  margin-left: 50px;
  outline: 0;
  border: none;
  border: 1px solid green;

  border-radius: 4px;
  :disabled {
    background: transparent;
    cursor: default;
    border: none
  } 
`
const StyledIcon = styled.img`
  height: 20px;
  cursor: pointer;
  margin-left: 10px;
`
const Btn = styled.button`
  background: transparent;
  border: none;
`
const NameFinalField = props => {
  const { input, open } = props
  return <NameField {...input} disabled={open} />
}
const Profile = (props) => {
  const {
    initialValues,
    onDelete,
    listAddress,
    onFullnameUpdate,
    onPicUpdate
  } = props

  const phoneNumber = path(['phoneNumber'], initialValues)
  const addressList = pathOr([], ['data'], listAddress)
  const [open, setOpen] = useState(true)

  return (
    <Form
      onSubmit={(value) => onFullnameUpdate(value).then(() => setOpen(!open))}
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FieldWrapper>
            <Field
              name="photo"
              component={ImageUpload}
              onSuccess={onPicUpdate}
            />
          </FieldWrapper>
          <UserInfo>
            <UserNamePhone>Имя и фамилия</UserNamePhone>
            <Field
              type="text"
              placeholder="Имя Фамилия"
              open={open}
              component={NameFinalField}
              name="fullName"
            />
            {
              open ? (
                <EditName onClick={() => setOpen(!open)}>Изменить</EditName>
              ) : (
                <Btn type="submit">
                  <StyledIcon src={Tick} alt="123" />
                </Btn>
              )
            }

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
        </form>
      )}
    />
  )
}

export default Profile
