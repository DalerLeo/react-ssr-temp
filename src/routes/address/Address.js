import React from 'react'
import styled from 'styled-components'
import Container from 'components/StyledElems/Container'
import CreateAddressForm from './CreateAddressForm'

const CardContainer = styled.div`
  display: flex;
`

const Address = (props) => {
  console.warn(props)
  
  const { onSubmit, addAddress } = props
  return (
    <Container>
      <h1>Мои заказы</h1>
      <CardContainer>
        <CreateAddressForm onSubmit={onSubmit} addAddress={addAddress} />
      </CardContainer>
    </Container>
  )
}

export default Address
