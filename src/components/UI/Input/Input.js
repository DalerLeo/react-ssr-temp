import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const InputWrapper = styled.div`
  position: relative;
`
const InputField = styled.input`
width: 100%;
  background: #FDFDFD;
  border: 1px solid #DBDBDD;
  box-sizing: border-box;
  border-radius: 5px;
  height: 56px;
  padding: 0 15px;
  padding-top: 18px;
  outline: 0;
  transition: 200ms;
  :focus {
    border-color: ${props => props.theme.colors.primary.default}

  }
  :disabled {
    background: #f2f2f2;
  }
`
const Label = styled.label`
  cursor: text;
  position:absolute;
  top: 19px;
  transition: all 200ms;
  left: 15px;
  font-size: 16px;
  color: #818591;
  
  ${props => (props.focus || props.value) && css`
    top: 8px;
    font-size: 13px;
`}
${props => props.value && css`
    color: #818591;
`}
${props => props.focus && css`
    color: ${() => props.theme.colors.primary.default};
`}
  
`

const Input = props => {
  const { label, onFocus, onBlur, value, name, ...rest } = props

  const [focus, setFocus] = useState()
  const onFocusHandler = ev => {
    setFocus(true)
    onFocus()
  }
  const onBlurHandler = ev => {
    setFocus(false)
    onBlur()
  }
  return (
    <InputWrapper>
      <Label
        htmlFor={`input-${name}`}
        focus={focus}
        value={value}
      >
        {label}
      </Label>
      <InputField
        {...rest}
        id={`input-${name}`}
        name={name}
        value={value}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
      />
    </InputWrapper>
  )
}
Input.propTypes = {
  label: PropTypes.string
}
export default Input
