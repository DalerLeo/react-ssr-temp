import React from 'react'
import styled from 'styled-components'

const FavButton = styled.button`
    background: ${props => props.favourite ? 'red' : 'none'};
    border: 1px solid #818591;
    box-sizing: border-box;
    border-radius: 3px;
`

const FavouriteButton = (props) => {
  const { favourite } = props
  return (
    <FavButton favourite={favourite}>
            В избранное
    </FavButton>
  )
}

export default FavouriteButton
