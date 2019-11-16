import React from 'react'
import styled from 'styled-components'
import Container from 'components/StyledElems/Container'
import Modal from 'components/UI/Modal'

const CardContainer = styled.div`
  display: flex;
`

const Profile = (props) => {
  return (
    <Container>

      <h1>Мои заказы</h1>
      <CardContainer>
        <Modal />
      </CardContainer>
    </Container>
  )
}

export default Profile
