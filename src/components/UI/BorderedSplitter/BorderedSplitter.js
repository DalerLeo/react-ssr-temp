import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  position: relative;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: space-between;
  :before {
    z-index: 1;
    left: 0;
    content: " ";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 1px;
    background-color: #E0E0E0;
  }
`

const Bordered = styled.div`
  padding: 8px 20px;
  border-radius: ${props => props.theme.borderRadius};
  position: relative;
  z-index: 2;
  background-color: #fff;
  border: ${props => props.theme.border}
`
const BorderSplitter = props => {
  const { children, left } = props
  return (
    <Container>
      <Bordered>
        <b>{left}</b>
      </Bordered>
      <Bordered>
        {children}
      </Bordered>
    </Container>
  )
}

export default BorderSplitter
