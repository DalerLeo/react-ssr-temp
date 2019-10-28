import React from 'react'
import styled from 'styled-components'
import Container from 'components/Container'
import TopHeader from './TopHeader'
import Logo from 'icons/Logo'

const HeaderStyled = styled.div`
  display: flex;
  padding: 14px 150px;
  height: 78px;
  background-color: #2EBB8A;
`
const LogoBlock = styled.div`

`
const SearchBlock = styled.div`
  margin-left: 145px;
  margin-top: -10px;
`

const SearchField = styled.input`
  height: 50px;
  width: 366px;
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  outline: 0;
`
const SearchButton = styled.button`
  border: none;
  height: 50px;
  width: 75px;
  background-color: #29D398;
  color: white;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  outline: 0;
  cursor: pointer;
`
const Header = () => {
  return (
    <div>

      <TopHeader/>
      <HeaderStyled>
        <LogoBlock>
          <Logo/>
        </LogoBlock>
        <SearchBlock>
          <SearchField placeholder="Я хочу найти..."/>
          <SearchButton>
            Найти
          </SearchButton>
        </SearchBlock>
      </HeaderStyled>
    </div>
  )
}
export default Header
