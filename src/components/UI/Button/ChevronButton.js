import React, { useState } from 'react'
import ChevDownIcon from 'icons/ChevDown'
import styled from 'styled-components'

const ChevronStyled = styled.div`
    cursor: pointer;
`
const ChevIconStyled = styled(ChevDownIcon)`
    transform: rotate(${props => props.isFiltered ? '180' : '0'}deg);
    transition: 0.5s;
`
const ChevronButton = (props) => {
  const [isFiltered, setIsFiltered] = useState(false)
  return (
    <ChevronStyled onClick={() => setIsFiltered(!isFiltered)}>
            Сначала новые <ChevIconStyled isFiltered={isFiltered} />
    </ChevronStyled>
  )
}

export default ChevronButton
