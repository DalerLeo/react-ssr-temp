import React from 'react'
import styled from 'styled-components'

const SearchBlock = styled.div`
  display: flex;
`

const SearchFieldInput = styled.input`
  height: 50px;
  width: 70%;
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  outline: 0;
  padding-left: 20px;
`
const SearchButton = styled.button`
  border: none;
  height: 50px;
  width: 80px;
  background-color: #29D398;
  color: white;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  outline: 0;
  cursor: pointer;
`

const SearchField = (props) => {
  return (
    <SearchBlock>
      <SearchFieldInput placeholder="Я хочу найти..." />
      <SearchButton>
            Найти
      </SearchButton>
    </SearchBlock>
  )
}

export default SearchField
