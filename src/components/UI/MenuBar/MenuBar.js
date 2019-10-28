import React from 'react'
import styled from 'styled-components'
import MenuBarIcon from 'icons/MenuBar'

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
    margin: 11px 20px;
    cursor: pointer;
`
const MenuBar = () => {
  return (
    <div>
      <MenubarHeader>
        <MenuBarIcon />
        <MenubarText>
                Каталог товаров
        </MenubarText>
      </MenubarHeader>
      <MenuItems>
            Овощи
      </MenuItems>
      <MenuItems>
            Фрукты
      </MenuItems>
      <MenuItems>
      Молочные продукты
      </MenuItems>
      <MenuItems>
      Мясные продукты
      </MenuItems>
      <MenuItems>
      Хлебобулочные изделия
      </MenuItems>
      <MenuItems>
      Полуфабрикаты
      </MenuItems>
      <MenuItems>
      Консервы
      </MenuItems>
      <MenuItems>
      Бакалея
      </MenuItems>
      <MenuItems>
      Диетические продукты
      </MenuItems>
      <MenuItems>
      Детское питание
      </MenuItems>
    </div>
  )
}

export default MenuBar
