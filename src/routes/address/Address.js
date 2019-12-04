import React from 'react'
import styled from 'styled-components'
import Container from 'components/StyledElems/Container'
import CreateAddressForm from './AddressCreateForm'
import AddressList from './AddressList'

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Address = (props) => {
  const { onSubmit, addAddress, listAddress, onDelete } = props
  return (
    <Container>
      <h1>Мои заказы</h1>
      
      <CardContainer>
        <AddressList listAddress={listAddress} onDelete={onDelete} />
        <CreateAddressForm onSubmit={onSubmit} addAddress={addAddress} />
      </CardContainer>
    </Container>
  )
}

export default Address
