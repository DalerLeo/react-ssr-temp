import React, { useState } from 'react'
import styled from 'styled-components'
import { ToggleButton, RadioButton } from 'components/UI/Button'
import { useDispatch } from 'react-redux'
import { path } from 'ramda'

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
    margin: 10px 0;
`
const Sms = (props) => {
  const { activateMailingAction, deactivateMailingAction, userId, onLangUpdate, initialValues, onSubscriptionChange } = props

  const newsLang = path(['languageNews'], initialValues)

  return (
    <div>
      <SmsBlock>
        <SmsLanguage>Язык SMS рассылки</SmsLanguage>
        <RadioButton onChange={onLangUpdate} newsLang={newsLang} />
      </SmsBlock>
      <Line />
      <SmsBlock>
        <SmsLanguage>Отправлять SMS рассылки</SmsLanguage>
        <ToggleButton onChange={onSubscriptionChange} />
      </SmsBlock>
    </div>
  )
}

export default Sms
