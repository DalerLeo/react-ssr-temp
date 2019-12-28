import React from 'react'
import styled from 'styled-components'
import Link from 'components/Link'
import Telegram from 'icons/Telegram'
import Container from '../../Container'

const TopHeaderWidth = styled.div`
  width: 100%;
  background-color: #249E74;
`
const TopHeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    color: white;
    font-size: 12px;
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

const PhoneNumber = styled.div`
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
const TopHeader = () => {
  return (
    <TopHeaderWidth>
      <Container>
        <TopHeaderStyled>
          <LeftSide>
            <PhoneNumber>
          998 (97) 9555-212
            </PhoneNumber>
            <TelegramLink>
          t.me/lochin
            </TelegramLink>
          </LeftSide>
          <RightSide>
            <Link to="/delivery" style={{ color: 'white' }}>
              <Delivery>
          Доставка
              </Delivery>
            </Link>
            <Payment>
          Удобная оплата
            </Payment>
            <Region>
              <RegionTitle>
                <Telegram /> Регион:
              </RegionTitle>
              <RegionValue>
            Ташкент
              </RegionValue>
            </Region>
          </RightSide>
        </TopHeaderStyled>
      </Container>
    </TopHeaderWidth>
  )
}

export default TopHeader
