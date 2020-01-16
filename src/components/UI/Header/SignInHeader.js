import React, { useContext } from 'react'
import styled from 'styled-components'
import ArrowLeft from 'icons/ArrowLeft'
import Login from 'icons/Login.svg'
import History from '../../../HistoryProvider'

const HeaderBlock = styled.div`
  width: 1150px;
  margin: 45px auto;
  display: flex;
  
`
const BackLink = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 129.96%;
  color: #2E384C;
  cursor: pointer;
`
const LoginImage = styled.img`
  margin-left: 35%;
`

const SignInHeader = (props) => {
  const history = useContext(History)
  const goBack = () => history.goBack()

  return (
    <HeaderBlock>
      <BackLink>
        <div onClick={goBack}>
          <ArrowLeft /> Назад
        </div>
      </BackLink>
      <LoginImage src={Login} alt="logo" />
    </HeaderBlock>
  )
}

export default SignInHeader
