import React, { useContext } from 'react'
import { isEmpty } from 'ramda'
import styled from 'styled-components'
import useWindowScroll from '@react-hook/window-scroll'
import Link from 'components/Link'
import Dropdown from 'components/UI/Dropdown'
import ProfileImage from 'images/Profile.png'
import ProfileIcon from 'icons/Profile'
import Settings from 'icons/Settings'
import Logo from 'icons/Logo'
import ShoppingBag from 'icons/ShoppingBag'
import Location from 'icons/Locations'
import Enter from 'icons/ArrowLeft'
import Exit from 'icons/ArrowRight'
import { userSignOut } from 'routes/sign-in/actions'
import { useDispatch } from 'react-redux'
import DropdownMenu from 'components/DropdownMenu'
import FavoriteIcon from 'icons/Favorite'
import { Row, Col } from 'components/Grid'
import { SearchField } from 'components/UI/FormField'
import Container from 'components/Container'
import History from '../../../HistoryProvider'
import TopHeader from './TopHeader'

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  z-index: 20;
  top: 0;
  background-color: #2EBB8A;
`
const HeaderStyled = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 78px;
  width: 1200px;
  margin: auto;
`

const MyProfile = styled.div`
  display: flex;
  font-size: 16px;
  line-height: 164.57%;
  color: #FFFFFF;
  cursor: pointer;
`

const ProfileImageStyled = styled.img`
  max-width: 34px;
  max-height: 34px;
`
const DropdownItem = styled.div`
  display: flex;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  // position: ${props => props.open ? 'relative' : 'unset'};
  align-items: center;
  :hover{
    background: #EAFAF1;
    color: green;
    border-radius: 7px;
  }
`
const DropdownTexts = styled.div`
  margin-left: 10px;
`

const Header = (props) => {
  const { isAuth } = props

  const history = useContext(History)
  const dispatch = useDispatch()
  const onSignOut = () => {
    return dispatch(userSignOut())
      .then(() => history.replace('/'))
  }
  return (
    <HeaderBlock>

      <TopHeader />

      <Container>
      <HeaderStyled>
        <Col span={4}>
          <Link to="/">
            <Logo />
          </Link>
        </Col>
        <Col span={4}>
          <DropdownMenu />
        </Col>
        <Col span={9}>
          <SearchField />
        </Col>
        <Col span={4}>
          {isEmpty(isAuth)
            ? (
              <MyProfile>
                <Link to="/sign-in" style={{ color: 'white' }}>
                  <Exit style={{ fill: 'white', marginRight: '5px' }} />
                    Вход
                </Link>
              </MyProfile>)
            : (
              <MyProfile>
                <ProfileIcon />
                <Dropdown title="Мой профиль">
                  <DropdownItem>
                    <ProfileImageStyled src={ProfileImage} />
                    <DropdownTexts>+99893 593 58 69</DropdownTexts>
                  </DropdownItem>
                  <hr />
                  <DropdownItem>
                    <FavoriteIcon />
                    <Link to="/favourite">
                    Favourite
                    </Link>
                  </DropdownItem>
                  <hr />
                  <DropdownItem>
                    <Location />
                    <DropdownTexts>Мои заказы</DropdownTexts>
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
                  <DropdownItem onClick={() => onSignOut()}>
                    <Enter />
                    <DropdownTexts>Выход</DropdownTexts>
                  </DropdownItem>
                </Dropdown>
              </MyProfile>
            )}
        </Col>
        <Col span={2}>
          <MyProfile>
            <Link to="/cart" style={{ color: 'white' }}>
              <ShoppingBag />
                Корзина
            </Link>
          </MyProfile>
        </Col>
      </HeaderStyled>
      </Container>
    </HeaderBlock>
  )
}
export default Header
