import React, { useState } from 'react'
import styled from 'styled-components'

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

const Input = (props) => {
  const { label, name, updateField } = props

  const [focussing, setFocusing] = useState(false)
  const [value, setValue] = useState('')

  const onFocus = () => {
    setFocusing(true)
    setValue('+998')
  }

  return (
    <Group>
      <TextInput
        name={name}
        onFocus={onFocus}
        focussing={focussing}
        defaultValue={value}
        onChange={updateField}
      />
      <Label focussing={focussing}>{label} </Label>
    </Group>
  )
}

export default Input
