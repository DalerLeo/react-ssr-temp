import React from 'react'
import { isEmpty } from 'ramda'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Link from '../../Link'
import ProfileIcon from '../../../icons/Profile'
import { Dropdown } from '../Dropdown'
import ProfileImage from '../../../images/Profile.png'
import FavoriteIcon from '../../../icons/Favorite'
import Location from '../../../icons/Locations'
import Settings from '../../../icons/Settings'
import Enter from '../../../icons/ArrowLeft'

const ProfileLink = styled(Link)`
  margin-left: 30px;
  display: flex;
  font-size: 16px;
  line-height: 164.57%;
  color: #FFFFFF;
  cursor: pointer;
  :hover {
    color: #FFFFFF;    
  }
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
    color: #EAFAF1;
    border-radius: 7px;
  }
`
const DropdownTexts = styled.div`
  margin-left: 10px;
`
const StyledProfileIcon = styled.div`
  margin-top: 23px;
  margin-right: 8px;
`

const AutMenu = props => {
  const { isAuth, onSignOut } = props

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
          <DropdownItem>
            <ProfileImageStyled src={ProfileImage} />
            <DropdownTexts>+99893 593 58 69</DropdownTexts>
          </DropdownItem>
          <hr />
          <DropdownItem>
            <FavoriteIcon />
            <Link to="/favourite">
              <DropdownTexts>
                Избранные товары
              </DropdownTexts>
            </Link>
          </DropdownItem>
          <hr />
          <DropdownItem>
            <Location />
            <DropdownTexts>
              <Link to="/my-order">Мои заказы</Link>
            </DropdownTexts>
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
          <DropdownItem onClick={onSignOut}>
            <Enter />
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
