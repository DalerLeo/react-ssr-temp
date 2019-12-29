import * as STATE from 'constants/stateNames'
import React, { useState } from 'react'
import { pathOr, path } from 'ramda'
import styled from 'styled-components'
import Link from 'components/Link'
import MenuBarIcon from 'icons/MenuBar'
import { useSelector } from 'react-redux'
import { getDataFromState } from '../../../utils/get'

const DropdownBlock = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-left: 50px;
`
const DropdownItem = styled.div`
  margin-bottom: 20px;
  padding-right: 25px;
  width: 20%;
  align-items: center;
`
const DropdownTexts = styled.div`
  font-size: 15px;
  line-height: 129.96%;
  color: #2E384C;
  font-weight: 600;
  margin-bottom: 10px;
  :hover{
    color: #13885F;
  }
`
const DropdownSubText = styled.div`
  font-size: 15px;
  margin-bottom: 7px;
  line-height: 130%;
`
const LogoStyled = styled.div`
    margin-top: -5px;
    padding: 7px;
    background-color: #29D398;
    border-radius: 5px;
    margin-right: 10px;
`
const DropdownContent = styled.div`
    position: absolute;
    overflow: auto;
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
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 1190px
    
`
const defArray = []
const Header = (props) => {
  const menuData = useSelector(getDataFromState(STATE.MENU_AS))
  const [open, setMenuOpen] = useState(false)
  const lists = pathOr(defArray, ['results'], menuData)

  return (
    <DropdownBlock
      onMouseLeave={() => setMenuOpen(false)}
      onMouseEnter={() => setMenuOpen(true)}
    >
      <LogoStyled>
        <MenuBarIcon />
      </LogoStyled>
      <DropdownStyled>
        <StyledTitle>
          Каталог товаров
        </StyledTitle>
        {open && (
          <DropdownContent>
            <WrapContent>
              {lists.map((list, key) => {
                const parentId = path(['id'], list)
                const subMenu = path(['children'], list)
                return (
                  <DropdownItem
                    key={parentId}
                  >
                    <Link to={`/categories/${parentId}`} beforeRedirect={() => setMenuOpen(false)}>
                      <DropdownTexts>{list.name}</DropdownTexts>
                    </Link>
                    {subMenu.map((sub) => {
                      const subId = path(['id'], sub)
                      return (
                        <Link key={subId} to={`/categories/${subId}`} beforeRedirect={() => setMenuOpen(false)}>
                          <DropdownSubText>{sub.name}</DropdownSubText>
                        </Link>
                      )
                    })}

                  </DropdownItem>
                )
              })}
            </WrapContent>
          </DropdownContent>
        )}
      </DropdownStyled>
    </DropdownBlock>
  )
}
export default Header
