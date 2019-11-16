import React, { useState } from 'react'
import styled from 'styled-components'
import useWindowScroll from '@react-hook/window-scroll'
import Link from 'components/Link'
import Dropdown from 'components/UI/Dropdown'
import ProfileImage from 'images/Profile.png'
import ProfileIcon from 'icons/Profile'
import Settings from 'icons/Settings'
import Logo from 'icons/Logo'
import MenuBarIcon from 'icons/MenuBar'
import ShoppingBag from 'icons/ShoppingBag'
import Location from 'icons/Locations'
import Enter from 'icons/ArrowLeft'
import Exit from 'icons/ArrowRight'
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
  display: flex;
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
const ProfileImageStyled = styled.img`
  max-width: 34px;
  max-height: 34px;
`
const DropdownItem = styled.div`
  display: flex;
  align-items: center;
`
const DropdownTexts = styled.div`
  margin-left: 10px;
`
const Header = () => {
  const [isAuth, setIsAuth] = useState(false)
  const scrollY = useWindowScroll(60)
  return (
    <HeaderBlock>
      <TopHeader />
      <HeaderStyled>
        <LogoBlock>
          <Link to="/">
            <Logo />
          </Link>
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
        {isAuth ? <MyProfile>
          <Link to="/sign-in" style={{ color: 'white' }}>
            <Exit style={{ fill: 'white', marginRight: '5px' }} />
            Вход
          </Link>
        </MyProfile> : <MyProfile>
                   <ProfileIcon />
                   <Dropdown title="Мой профиль">
            <DropdownItem>
              <ProfileImageStyled src={ProfileImage} />
              <DropdownTexts>+99893 593 58 69</DropdownTexts>
            </DropdownItem>
            <hr />
            <DropdownItem>
              <Location />
              <DropdownTexts>Мои заказы </DropdownTexts>
            </DropdownItem>
            <hr />
            <DropdownItem>
              <Location />
              <Link to="/address">
                <DropdownTexts>Мои адреса</DropdownTexts>
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Settings />
              <Link to="/profile">
                <DropdownTexts>Настройки</DropdownTexts>
              </Link>
            </DropdownItem>
            <hr />
            <DropdownItem>
              <Enter />
              <DropdownTexts>Выход</DropdownTexts>
            </DropdownItem>
          </Dropdown>
        </MyProfile>}

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
