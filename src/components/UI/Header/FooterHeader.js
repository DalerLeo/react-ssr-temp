import React from 'react'
import styled from 'styled-components'
import Link from 'components/Link'
import Telegram from 'icons/Telegram'
import Container from '../../Container'

const TopHeaderWidth = styled.div`
  width: 100%;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`
const TopHeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    color: #4F4F4F;
    font-size: 14px;
    line-height: 164.57%;
    cursor: pointer;
    margin: auto;
`
const LeftSide = styled.div`
    display: flex;
`
const RightSide = styled.div`
    display: flex;
`

const MenuTitle = styled.div`
    margin-right: 50px;
`
const TelegramLink = styled.div`

`
const Delivery = styled.div`

`
const Payment = styled.div`
  margin-left: 50px;
`
const Region = styled.div`
  display: flex;
  margin-left: 50px;
`
const RegionTitle = styled.div`
  margin-right: 5px;
`
const RegionValue = styled.div`
  border-bottom: 1px solid white;
`
const FooterHeader = () => {
  return (
    <TopHeaderWidth>
      <Container>
        <TopHeaderStyled>
          <LeftSide>
            <MenuTitle>
              Главная
            </MenuTitle>
            <MenuTitle>
              Аккумуляторы
            </MenuTitle>
            <MenuTitle>
              Шины
            </MenuTitle>
            <MenuTitle>
              Прайлист
            </MenuTitle>
            <MenuTitle>
              Контакты
            </MenuTitle>

          </LeftSide>
          <RightSide>
          </RightSide>
        </TopHeaderStyled>
      </Container>
    </TopHeaderWidth>
  )
}

export default FooterHeader
