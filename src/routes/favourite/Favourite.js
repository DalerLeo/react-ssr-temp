import React from 'react'
import Header from 'components/UI/Header'
import PropTypes from 'prop-types'
import Container from 'components/StyledElems/Container'

const Favourite = props => {
  return (
    <div>
      <Header />
      <Container>
        213
      </Container>
    </div>
  )
}

Favourite.propTypes = {
  products: PropTypes.array,
  onDelete: PropTypes.func
}
export default Favourite
