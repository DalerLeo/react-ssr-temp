import React from 'react'
import RatingIcon from 'icons/Stars'
import styled from 'styled-components'

const RatingStyled = styled(RatingIcon)`
    cursor: pointer;
`
const counts = [1, 2, 3, 4, 5]
const Rating = (props) => {
  return (
    <div>
      {counts.map((count, key) => {
        return <RatingStyled key={key} />
      })}
    </div>
  )
}

export default Rating
