import React from 'react'
import styled from 'styled-components'

const DropdownContent = styled.div`
    display: none;
    position: absolute;
    left: -40px;
    background-color: #fff;
    color: black;
    border-radius: 7px;
    min-width: 215px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    z-index: 1;
`
const DropdownStyled = styled.div`
    position: relative;
    display: inline-block;
    opasity: 0;
    &:hover ${DropdownContent} {
        display: block;
        opasity: 1;
        transition: opasity 2s;
    }
`

const Dropdown = (props) => {
  const { title, children } = props
  return (
    <DropdownStyled>
      {title}
      <DropdownContent>
        {children}
      </DropdownContent>
    </DropdownStyled>
  )
}

export default Dropdown
