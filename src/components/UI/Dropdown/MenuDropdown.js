import React from 'react'
import styled from 'styled-components'

const DropdownContent = styled.div`
    display: none;
    position: absolute;
    left: -260px;
    top: 74px;
    background-color: #fff;
    color: black;
    min-width: 1200px;
    padding: 12px 16px;
    z-index: 1;
`
const DropdownStyled = styled.div`
    position: relative;
    display: inline-block;
    opasity: 0;
    height: 74px;
    &:hover ${DropdownContent} {
        display: block;
        opasity: 1;
        transition: opasity 2s;
    }
`
const StyledTitle = styled.div`
    margin-top: 25px;
    color: #FFFFFF;
`
const WrapContent = styled.div`
    height: 570px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    
`
const MenuDropdown = (props) => {
  const { title, children } = props
  return (
    <DropdownStyled>
      <StyledTitle>
        {title}
      </StyledTitle>
      <DropdownContent>
        <WrapContent>
          {children}
        </WrapContent>
      </DropdownContent>
    </DropdownStyled>
  )
}

export default MenuDropdown
