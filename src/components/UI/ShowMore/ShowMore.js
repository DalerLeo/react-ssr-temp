import React from 'react'
import styled from 'styled-components'

const ShowMoreStyled = styled.button`
    outline: 0;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 40px;
    background-color: #ECECEC;
    border-radius: 5px;
    padding: 16px;
    border: none;
    cursor: pointer;
`
const ShowMoreText = styled.div`
    text-align: center;
`
const ShowMore = () => {
  return (
    <ShowMoreStyled>
      <ShowMoreText>
        Показать еще
      </ShowMoreText>
    </ShowMoreStyled>
  )
}
export default ShowMore
