import React, { useState } from 'react'
import { pathOr, find, propEq, path } from 'ramda'
import styled from 'styled-components'
import Link from 'components/Link'
import Dropdown from 'components/UI/Dropdown'
import MenuModal from 'components/UI/MenuModal'
import useFetchList from 'hooks/useFetchList'
import { menuAs } from '../UI/MenuBar/actions'

const DropdownItem = styled.div`
  display: flex;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: ${props => props.open ? 'relative' : 'unset'};
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

const defArray = []
const Header = (props) => {
  const menuData = useFetchList({
    action: menuAs,
    stateName: 'menuAs'
  })
  const [open, setMenuOpen] = useState(false)
  const lists = pathOr(defArray, ['results'], menuData)
  const subCategories = find(propEq('id', open))(lists)

  return (

    <Dropdown title="Каталог товаров" onMouseLeave={() => setMenuOpen(false)}>
      {lists.map((list, key) => {
        const parentId = path(['id'], list)
        return (
          <DropdownItem
            key={key}
            open={open === list.id}
            onMouseEnter={() => setMenuOpen(list.id)}
          >
            <Link to={`/categories/${parentId}`}>
              <DropdownTexts>{list.name}</DropdownTexts>
              <MenuModal open={open === list.id} subCategories={subCategories} key={key} />
            </Link>
          </DropdownItem>
        )
      })}
    </Dropdown>

  )
}
export default Header
