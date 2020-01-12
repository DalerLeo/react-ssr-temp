import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button } from 'components/UI/Button'
import Logo from 'icons/Logo'
import Preloader from 'components/UI/PreLoader'

const TopHeaderStyled = styled.div`
    margin-top: -120px;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
`
const SignInStyled = styled.div`
    display: flex;
    justify-content: center;
    background-color: #2EBB8A;
    padding: 20px 0;
`
const Enter = styled.div`
    display: block;
    margin-top: 150px;
    color: #222121;
    font-size: 36px;
    font-wight: bold;
    text-align: center;
    margin-left: -24%;
`
const PhoneNumber = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 119.46%;
  color: #2E384C;
  mix-blend-mode: normal;
`
const InputWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`
const InputNumber = styled.div`
    font-size: 15px;
    line-height: 1.67;
    padding: 10px 15px;
    background-color: ${props => props.theme.colors.primary.hover};
    border-right: none;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
`
const InputPassword = styled.input`
    border-radius: 7px;
    font-size: 15px;
    line-height: 1.67;
    color: #222121;
    border: none;
    outline: 0;
    padding: 10px;
    width: 450px;
    ::-webkit-inner-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
    ::-webkit-outer-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
`
const InputMessage = styled.input`
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
    font-size: 15px;
    line-height: 1.67;
    color: #222121;
    border: none;
    outline: 0;
    padding: 10px;
    width: 380px;
    ::-webkit-inner-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
    ::-webkit-outer-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
`
const SubmitButton = styled(Button)`
    float: right;
    margin-top: 20px;
`
const LoginContainer = styled.div`
    display: ${props => props.openLogin ? 'block' : 'none'};
`

const Loading = styled.div`
`

const SignIn = (props) => {
  const { onRegister, onLogin, registerData } = props

  const loading = registerData.loading
  const [openLogin, setOpenLogin] = useState(false)
  const [form, setValues] = useState({
    phoneNumber: '',
    password: ''
  })

  const handleLogin = () => onLogin(form.password, form.phoneNumber)

  const updateField = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  useEffect(() => {
    if (form.phoneNumber.length === 9) {
      onRegister(form.phoneNumber).then(() => setOpenLogin(true))
    }
  }, [form.phoneNumber, onRegister])

  return (
    <div>
      <Container>
        <PhoneNumber>
          Авторизация
        </PhoneNumber>
        <InputWrapper>
          <form onSubmit={(ev) => ev.preventDefault()}>
            <InputWrapper>
              <InputNumber>
                +998
              </InputNumber>
              <InputMessage
                name="phoneNumber"
                type="number"
                placeholder="Номер телефона"
                value={form.username}
                onChange={updateField}
              />
            </InputWrapper>
            {loading && <Loading><Preloader /></Loading>}
            <LoginContainer openLogin={openLogin}>
              <InputWrapper>
                <InputPassword
                  name="password"
                  type="number"
                  placeholder="Введите пароль полученный через SMS"
                  value={form.password}
                  onChange={updateField}
                />
              </InputWrapper>
              <SubmitButton type="button" onClick={handleLogin}>Отправить</SubmitButton>
            </LoginContainer>
          </form>
        </InputWrapper>
      </Container>
    </div>
  )
}

export default SignIn
