import React from 'react'
import styled from 'styled-components'
import { spinAnimStyle } from '../../../constants/styles'

const Wrapper = styled.label`
  margin: 5px 0;
`

const Input = styled.input`
`
const Checkbox = props => {
  const { name, id, children } = props
  return (
    <Wrapper forHtml={name + id}>
      <Input type="checkbox" id={id} />
      <span>{children}</span>
    </Wrapper>
  )
}

export default Checkbox
