import React from 'react'
import styled from 'styled-components'
import { path } from 'ramda'

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const InputField = styled.input`
  background: #FDFDFD;
  border: 1px solid #DBDBDD;
  box-sizing: border-box;
  border-radius: 5px;
  height: 57px;
  padding: 0 15px;
  outline: 0;
  :disabled {
    background: #f2f2f2;
  }
`
const Label = styled.label`
  font-size: 15px;
  margin-bottom: 10px;
`
const FormField = props => {
  const { label, placeholder, input, ...rest } = props
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <InputField placeholder={placeholder} {...input} {...rest} />
    </InputWrapper>
  )
}

export default FormField
