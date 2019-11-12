import React from 'react'
import styled from 'styled-components'
import Logo from 'icons/Logo'
import Profile from 'icons/Profile'
import ShoppingBag from 'icons/ShoppingBag'
import useWindowScroll from '@react-hook/window-scroll'
import MenuBarIcon from 'icons/MenuBar'
import Link from 'components/Link'
import TopHeader from './TopHeader'

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  z-index: 20;
  top: 0;
`
const HeaderStyled = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 14px 150px;
  height: 78px;
  background-color: #2EBB8A;
`
const LogoBlock = styled.div`

`
const SearchBlock = styled.div`
  width: ${props => props.scrollY > 100 ? '340px' : '400px'};
  display: flex;
  margin-left: ${props => props.scrollY > 100 ? '0px' : '-200px'};
  z-index: 1;
`

const SearchField = styled.input`
  height: 50px;
  width: 80%;
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  outline: 0;
  padding-left: 20px;
`
const SearchButton = styled.button`
  border: none;
  height: 50px;
  width: 20%;
  background-color: #29D398;
  color: white;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  outline: 0;
  cursor: pointer;
`
const MyProfile = styled.div`
  font-size: 16px;
  line-height: 164.57%;
  color: #FFFFFF;
  cursor: pointer;
`
const MenubarHeader = styled.div`
    display: flex;
    width: 217px;
    height: 52px;
    padding: 15px 20px;
    margin-left: 10px;
    opacity: ${props => props.scrollY > 100 ? '1' : '0'};
    transition: opacity 0.5s ease;
    cursor: pointer;
`
const MenubarText = styled.div`
    font-size: 16px;
    line-height: 164.57%;
    color: white;
    margin-left: 8px;
`
const LogoStyled = styled.div`
    padding-bottom: 10px;
    background-color: #29D398;
    border-radius: 5px;
`

const Header = () => {
  const scrollY = useWindowScroll(60)
  return (
    <HeaderBlock>
      <TopHeader />
      <HeaderStyled>
        <LogoBlock>
          <Logo />
        </LogoBlock>
        <MenubarHeader scrollY={scrollY}>
          <LogoStyled>
            <MenuBarIcon />
          </LogoStyled>
          <MenubarText>
            Каталог товаров
          </MenubarText>
        </MenubarHeader>
        <SearchBlock scrollY={scrollY}>
          <SearchField placeholder="Я хочу найти..." />
          <SearchButton>
            Найти
          </SearchButton>
        </SearchBlock>
        <MyProfile>
          <Link to="/sign-in" style={{ color: 'white' }}>
            <Profile />
            Мой профиль
          </Link>
        </MyProfile>
        <MyProfile>
          <Link to="/cart" style={{ color: 'white' }}>
            <ShoppingBag />
            Корзина
          </Link>
        </MyProfile>
      </HeaderStyled>
    </HeaderBlock>
  )
}
export default Header
