import React, { useContext } from 'react'

import styled from 'styled-components'
import Link from 'components/Link'
import Logo from 'icons/Logo'
import ShoppingBag from 'icons/ShoppingBag'

import { userSignOut } from 'routes/sign-in/actions'
import { useDispatch } from 'react-redux'
import { SearchField } from 'components/UI/FormField'
import DisplayFlex from 'components/StyledElems/DisplayFlex'
import Cont from 'components/Container'
import History from '../../../HistoryProvider'
import Catalog from './Catalog'
import TopHeader from './TopHeader'
import AuthMenu from './AuthMenu'

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  z-index: 20;
  top: 0;
  background-color: #2EBB8A;
`

const Container = styled(Cont)`
  position: relative;
`
const CartLink = styled(Link)`
  margin-left: 30px;
  display: flex;
  font-size: 16px;
  line-height: 164.57%;
  color: #FFFFFF!important;
  cursor: pointer;
  :hover {
    color: #FFFFFF;    
  }
  svg {
  margin-right: 8px;
  }
`

const Header = (props) => {
  const { isAuth } = props

  console.warn(isAuth)
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
        <DisplayFlex alignItems="center">
          <Link to="/">
            <Logo />
          </Link>
          <Catalog />
          <SearchField />
          <AuthMenu isAuth={isAuth} onSignOut={onSignOut} />
          <CartLink to="/cart">
            <ShoppingBag />
            Корзина
          </CartLink>
        </DisplayFlex>
      </Container>
    </HeaderBlock>
  )
}
export default Header
