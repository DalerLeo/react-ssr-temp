import React from 'react'
import Header from 'components/UI/Header'
import Container from 'components/StyledElems/Container'
import Cart from 'components/UI/Cart'

const Home = props => {
  return (
    <div>
      <Header />
      <Container>
        <Cart />
      </Container>
    </div>
  )
}

export default Home
