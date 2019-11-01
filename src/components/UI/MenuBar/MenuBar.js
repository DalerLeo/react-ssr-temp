import React, { useState } from 'react'
import { path, find, propEq } from 'ramda'
import styled from 'styled-components'
import MenuBarIcon from 'icons/MenuBar'
import Modal from 'components/UI/Modal'
import list from './contants'

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
    font-size: 14px;
    line-height: 129.96%;
    padding: 6px 20px;
    cursor: pointer;
    :hover{
      color: #2EBB8A;
      background: #EAFAF1;
    }
`

const MenuBar = () => {
  const [open, setMenuOpen] = useState(false)
  const subCategories = find(propEq('id', open), list)
  return (
    <div style={{ position: 'relative' }} onMouseLeave={() => setMenuOpen(false)}>
      <MenubarHeader>
        <MenuBarIcon />
        <MenubarText>
          Каталог товаров
        </MenubarText>
      </MenubarHeader>
      {list.map((type, key) => {
        return (
          <MenuItems
            onMouseEnter={() => setMenuOpen(type.id)}
            key={key}
          >
            {type.name}
          </MenuItems>
        )
      })}
      {open && <Modal subCategories={subCategories} />}
    </div>
  )
}

export default MenuBar
