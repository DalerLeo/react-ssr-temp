import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'recompose'

const enhance = compose(
)

const HeaderMain = styled.div`
  background-color: #2EBB8A;
`
const Container = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`
const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
`
const HeaderBottom = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
`
const Logo = styled.div`
  
`
const MenuItemsTop = styled.div`
  font-size: 12px;
  line-height: 164.57%;
  color: white;
`
const MenuItemsBottoms = styled.div`
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  cursor: pointer;
  &:nth-child(2) {
    margin-left: -25%;
  }
  &:nth-child(3) {
    margin-left: -40%;
  }
`
const Header = props => {
  return (
    <HeaderMain>
      <Container>
        <HeaderTop>
          <MenuItemsTop>
            Бесплатная доставка
          </MenuItemsTop>
          <MenuItemsTop>
            Удобная оплата
          </MenuItemsTop>
          <MenuItemsTop>
          Регион: Tashkent
          </MenuItemsTop>
        </HeaderTop>
        <HeaderBottom>
          <MenuItemsBottoms>
          Главная
          </MenuItemsBottoms>
          <MenuItemsBottoms>
          О нас
          </MenuItemsBottoms>
          <MenuItemsBottoms>
            998 (97) 744 97 09
          </MenuItemsBottoms>
        </HeaderBottom>
      </Container>
    </HeaderMain>
  )
}

Header.propTypes = {
  classes: PropTypes.object
}
export default enhance(Header)
