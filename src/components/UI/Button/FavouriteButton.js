import React, { useState } from 'react'
import styled from 'styled-components'

const FavButton = styled.button` 
    background-color: ${props => props.favourite ? 'red' : 'none'}
`
const FavouriteButton = (props) => {
  return (
    <div>
      <FavButton>123</FavButton>
        123
    </div>
  )
}

export default FavouriteButton
