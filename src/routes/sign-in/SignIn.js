import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from 'components/UI/Button'
import Preloader from 'components/UI/PreLoader'
import SignInHeader from 'components/UI/Header/SignInHeader'
import useCompareEffect from '../../hooks/useCompareEffect'
import Timer from './components/Timer'

const Container = styled.div`
  height: 100%;
  padding: 0;
  margin-top: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Wrapper = styled.div`
  width: auto;
`
const Enter = styled.div`
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
const InputField = styled.input`
  background: #FDFDFD;
  border: 1px solid #DBDBDD;
  box-sizing: border-box;
  border-radius: 5px;
  color: #222121;
  outline: 0;
  padding: 10px;
  width: 436px;
  height: 57px;
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
  margin: 20px 0 20px 170px;
`
const TimerText = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #818591;
`

const TimerBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
`

const Group = styled.div`
    position:relative;
`

const TextInput = styled.input`
    font-size:18px;
    padding: 16px 0 7px 16px;
    display:block;
    width: 436px;
    outline: ${props => props.focussing ? 'none' : 'hidden'};
    background: #FDFDFD;
    border: 1px solid #DBDBDD;
    box-sizing: border-box;
    border-radius: 5px;
    height: 57px;
`

const Label = styled.label`
    font-weight:normal;
    position: absolute;
    pointer-events:none;
    left:15px;
    transition:0.2s ease all; 
    color:${props => props.focussing ? '#818591' : '#818591'}; 
    font-size:${props => props.focussing ? 13 : 16}px;
    top:${props => props.focussing ? 3 : 20}px;
`

const SignIn = (props) => {
  const { onRegister, onLogin, registerData, loginData } = props

  const loadingRegister = registerData.loading
  const loadingLogin = loginData.loading
  const [openLogin, setOpenLogin] = useState(false)
  const [form, setValues] = useState({
    phoneNumber: '',
    password: ''
  })

  const updateField = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  useCompareEffect(() => {
    if (form.phoneNumber.length === 13) {
      onRegister(form.phoneNumber).then(() => setOpenLogin(true))
    }
  }, [form.phoneNumber])

  useCompareEffect(() => {
    if (form.password.length === 5) {
      onLogin(form.password, form.phoneNumber)
    }
  }, [form.password, form.phoneNumber])

  const [focussing, setFocusing] = useState(false)
  const [value, setValue] = useState('')

  const onFocus = () => {
    setFocusing(true)
    setValue('+998')
  }
  return (
    <>
      <SignInHeader />
      <Container>
        <Wrapper>
          <Enter>
        Авторизация
          </Enter>
          <InputWrapper>
            <form onSubmit={(ev) => ev.preventDefault()}>
              <InputWrapper>
                <Group>
                  <TextInput
                    name="phoneNumber"
                    onFocus={onFocus}
                    focussing={focussing}
                    defaultValue={value}
                    onChange={updateField}
                  />
                  <Label focussing={focussing}>Номер телефона </Label>
                </Group>
              </InputWrapper>
              {loadingRegister && <Loading><Preloader /></Loading>}
              <LoginContainer openLogin={openLogin}>
                <InputWrapper>
                  <InputField
                    name="password"
                    type="number"
                    placeholder="Код из SMS"
                    value={form.password}
                    onChange={updateField}
                  />
                </InputWrapper>
                {loadingLogin
                  ? <Loading><Preloader /></Loading> : (
                    <TimerBlock>
                      <TimerText>Мы отправили SMS с кодом на ваш номер</TimerText>
                      <Timer time={127} />
                    </TimerBlock>
                  )}

              </LoginContainer>
            </form>
          </InputWrapper>
        </Wrapper>
      </Container>
    </>
  )
}

export default SignIn
