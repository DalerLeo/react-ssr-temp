import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const DropdownContent = styled.div`
    position: absolute;
    left: 0;
    top: 74px;
    background-color: #fff;
    color: black;
    width: 100%;
    padding: 35px 16px;
    z-index: 1;
    height: calc(100vh - 103px);
`
const DropdownStyled = styled.div`
    display: inline-block;
    height: 74px;
`
const StyledTitle = styled.div`
    margin-top: 25px;
    color: #FFFFFF;
`
const WrapContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    
`
const MenuDropdown = (props) => {
  const { title, children, open } = props
  return (
    <DropdownStyled>
      <StyledTitle>
        {title}
      </StyledTitle>
      {open && (
        <DropdownContent>
        <WrapContent>
          {children}
        </WrapContent>
      </DropdownContent>
      )}
    </DropdownStyled>
  )
}

MenuDropdown.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node
}
export default MenuDropdown
