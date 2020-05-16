import * as STATE from 'constants/stateNames'
import React from 'react'
import { isEmpty, path } from 'ramda'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import MyOrder from 'icons/myOrders'
import SignOut from 'icons/SignOut'
import Link from '../../Link'
import ProfileIcon from '../../../icons/Profile'
import { Dropdown } from '../Dropdown'
import ProfileImage from '../../../images/Profile.png'
import FavoriteIcon from '../../../icons/Favorite'
import Settings from '../../../icons/Settings'

const ProfileLink = styled(Link)`
  margin-left: 60px;
  display: flex;
  font-size: 16px;
  line-height: 164.57%;
  color: #333333!important;
  cursor: pointer;
  :hover {
    color: #333333;
  }
`

const ProfileImageStyled = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
`
const DropdownItem = styled.div`
  display: flex;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 10px;
  // position: ${props => props.open ? 'relative' : 'unset'};
  align-items: center;
  :hover{
    color: #EAFAF1;
    border-radius: 7px;
  }
`
const DropdownTexts = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 129.96%;
  color: #242F3B;
  mix-blend-mode: normal;
  margin-left: 9px;
  margin-bottom: 5px;
`
const StyledProfileIcon = styled.div`
  margin-top: 23px;
  margin-right: 8px;
`
const UserName = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 129.96%;
  color: #242F3B;
  mix-blend-mode: normal;
`
const UserPhone = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 129.96%;
  color: #818591;
`
const UserBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`
const AutMenu = props => {
  const { isAuth, onSignOut } = props

  const userInfo = {}

  const userPhone = path(['data', 'phoneNumber'], userInfo)
  const fullName = path(['data', 'fullName'], userInfo)
  const photo = path(['data', 'photo', 'file'], userInfo)

  return isEmpty(isAuth)
    ? (
      <ProfileLink to="/sign-in">
          Вход
      </ProfileLink>)
    : (
      <ProfileLink>
        <StyledProfileIcon>
          <ProfileIcon />
        </StyledProfileIcon>
        <Dropdown title="Мой профиль">

          <Link to="/profile">
            <DropdownItem>
              <ProfileImageStyled src={typeof photo === 'undefined' ? ProfileImage : photo} />
              <UserBlock>
                <UserName>{fullName}</UserName>
                <UserPhone>{userPhone}</UserPhone>
              </UserBlock>
            </DropdownItem>
          </Link>
          <hr />
          <DropdownItem>
            <MyOrder />
            <DropdownTexts>
              <Link to="/my-order">Мои заказы</Link>
            </DropdownTexts>
          </DropdownItem>
          <DropdownItem>
            <FavoriteIcon />
            <DropdownTexts>
              <Link to="/favourite">
                Избранные товары
              </Link>
            </DropdownTexts>
          </DropdownItem>
          <hr />
          <DropdownItem>
            <Settings />
            <DropdownTexts>
              <Link to="/profile">
                Настройки
              </Link>
            </DropdownTexts>
          </DropdownItem>
          {/* <DropdownItem>
            <Location />
            <Link to="/address">
              <DropdownTexts>Мои адреса</DropdownTexts>
            </Link>
          </DropdownItem> */}
          <hr />
          <DropdownItem onClick={onSignOut}>
            <SignOut />
            <DropdownTexts>Выход</DropdownTexts>
          </DropdownItem>
        </Dropdown>
      </ProfileLink>
    )
}

AutMenu.propTypes = {
  isAuth: PropTypes.string,
  onSignOut: PropTypes.func
}
export default AutMenu
