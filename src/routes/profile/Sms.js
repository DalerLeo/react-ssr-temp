import React from 'react'
import styled from 'styled-components'
import { ToggleButton, RadioButton } from 'components/UI/Button'

const SmsBlock = styled.div`
    display: flex;
    justify-content: space-between;
`
const SmsLanguage = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 164.57%;
    color: #2E384C;
`
const Line = styled.div`
    border-bottom: 1px solid #EAEAEC;
    margin: 14px 0;
`
const Sms = (props) => {
  return (
    <div>
      <SmsBlock>
        <SmsLanguage>Язык SMS рассылки</SmsLanguage>
        <RadioButton />
      </SmsBlock>
      <Line />
      <SmsBlock>
        <SmsLanguage>Отправлять SMS рассылки</SmsLanguage>
        <ToggleButton />
      </SmsBlock>
    </div>
  )
}

export default Sms
