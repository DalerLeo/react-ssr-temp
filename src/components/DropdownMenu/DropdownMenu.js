import React, { useState } from 'react'
import { pathOr, find, propEq, path } from 'ramda'
import styled from 'styled-components'
import Link from 'components/Link'
import { MenuDropdown } from 'components/UI/Dropdown'
import MenuModal from 'components/UI/MenuModal'
import useFetchList from 'hooks/useFetchList'
import MenuBarIcon from 'icons/MenuBar'
import { menuAs } from '../UI/MenuBar/actions'

const DropdownBlock = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`
const DropdownItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  width: 20%;
  text-overflow: ellipsis;
  position: ${props => props.open ? 'relative' : 'unset'};
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
  margin-bottom: 5px;
`
const LogoStyled = styled.div`
    margin-top: -5px;
    padding: 7px;
    background-color: #29D398;
    border-radius: 5px;
    margin-right: 10px;
`
const defArray = []
const Header = (props) => {
  const menuData = useFetchList({
    action: menuAs,
    stateName: 'menuAs'
  })
  const [open, setMenuOpen] = useState(false)
  const lists = pathOr(defArray, ['results'], menuData)
  // const subCategories = find(propEq('id', open))(lists)

  return (
    <DropdownBlock onMouseLeave={() => setMenuOpen(false)}>
      <LogoStyled>
        <MenuBarIcon />
      </LogoStyled>
      <MenuDropdown title="Каталог товаров">
        {lists.map((list, key) => {
          const parentId = path(['id'], list)
          const subMenu = path(['children'], list)
          return (
            <DropdownItem
              key={key}
              open={open === list.id}
              onMouseEnter={() => setMenuOpen(list.id)}
            >
              <div>
                <Link to={`/categories/${parentId}`}>
                  <DropdownTexts>{list.name}</DropdownTexts>
                </Link>
                {subMenu.map((sub, key1) => {
                  const subId = path(['id'], sub)
                  return (
                    <Link key={key1} to={`/categories/${subId}`}>
                      <DropdownSubText>{sub.name}</DropdownSubText>
                    </Link>
                  )
                })}
              </div>
            </DropdownItem>
          )
        })}
      </MenuDropdown>
    </DropdownBlock>
  )
}
export default Header
