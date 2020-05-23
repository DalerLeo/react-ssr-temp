import React from 'react'
import styled from 'styled-components'
import Link from 'components/Link'
import NewLogo from 'icons/NewLogo'
import ShoppingBag from 'icons/ShoppingBag'

import { SearchField } from 'components/UI/FormField'
import DisplayFlex from 'components/StyledElems/DisplayFlex'
import Cont from 'components/Container'
import TopHeader from './TopHeader'

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  z-index: 20;
  top: 0;
  background-color: #FFD54C;
  margin-bottom: 52px;
`

const Container = styled(Cont)`
  position: relative;
`

const CartLink = styled(Link)`
  margin-left: 30px;
  display: flex;
  font-size: 16px;
  line-height: 164.57%;
  color: #333333!important;
  cursor: pointer;
  :hover {
    color: #333333;
  }
  svg {
  margin-right: 8px;
  }
`

const Header = (props) => {
  return (
    <HeaderBlock>
      <TopHeader />
      <Container>
        <DisplayFlex alignItems="center">
          <Link to="/">
            <NewLogo />
          </Link>

          <SearchField />
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
