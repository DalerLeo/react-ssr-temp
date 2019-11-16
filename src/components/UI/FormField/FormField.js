import React from 'react'
import styled from 'styled-components'
import { path } from 'ramda'

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const InputField = styled.input`
  height: 40px;
  width: 100%;
  background-color: white;
  border: 1px solid green;
  border-radius: 7px;
  outline: 0;
  padding: 10px;
`
const Label = styled.label`
  font-size: 20px;
  margin-bottom: 5px;
`
const FormField = props => {
  const { label, placeholder, input } = props
  const type = path(['input', 'type'], props)
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <InputField type={type} placeholder={placeholder} {...input}/>
    </InputWrapper>
  )
}

export default FormField
