import React from 'react'
import styled from 'styled-components'
import Caruselimg from 'images/Carusel.png'

const CaruselImage = styled.img`
  margin-left: 32px;
  width: 840px;
`
const Carusel = () => {
  return (
    <div>
      <CaruselImage src={Caruselimg} />
    </div>
  )
}

export default Carusel
