import React, { useState } from 'react'
import { find, propEq, pathOr, path } from 'ramda'
import styled from 'styled-components'
import MenuBarIcon from 'icons/MenuBar'
import Modal from 'components/UI/Modal'
import Link from 'components/Link'
import useFetchList from '../../../hooks/useFetchList'
import { menuAs } from './actions'

const MenuBarStyled = styled.div`
`
const MenubarHeader = styled.div`
    display: flex;
    width: 267px;
    height: 52px;
    background: #2EBB8A;
    padding: 15px 20px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
`
const MenubarText = styled.div`
    font-size: 16px;
    line-height: 164.57%;
    color: white;
    margin-left: 8px;
`
const MenuItems = styled.div`
    width: 260px;
    font-size: 14px;
    line-height: 129.96%;
    padding: 6px 20px;
    cursor: pointer;
    position: ${props => props.open ? 'relative' : 'unset'};
    :hover{
      background: #EAFAF1;
    }
`
const MenuItem = styled.div`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`
const defArray = []

const MenuBar = () => {
  const menuData = useFetchList({
    action: menuAs,
    stateName: 'menuAs'
  })

  const [open, setMenuOpen] = useState(false)
  const lists = pathOr(defArray, ['data'], menuData)
  console.warn('MENU_ ', lists)
  const subCategories = find(propEq('id', open), lists)
  return (
    <MenuBarStyled onMouseLeave={() => setMenuOpen(false)}>
      <MenubarHeader>
        <MenuBarIcon />
        <MenubarText>
          Каталог товаров
        </MenubarText>
      </MenubarHeader>
      {lists.map((type, key) => {
        const parentId = path(['id'], type)
        return (
          <MenuItems
            open={open === type.id}
            onMouseEnter={() => setMenuOpen(type.id)}
            key={key}
          >
            <Link to={`/categories/${parentId}`}>
              <MenuItem>{type.name}</MenuItem>
              <Modal open={open === type.id} subCategories={subCategories} key={key} />
            </Link>
          </MenuItems>
        )
      })}

    </MenuBarStyled>
  )
}

export default MenuBar
