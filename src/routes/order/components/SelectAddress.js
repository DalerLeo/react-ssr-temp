import React from 'react'
import styled from 'styled-components'
import { path } from 'ramda'

const RadioBlock = styled.div`
    display: flex;
    flex-direction: column;
`
const RadioBlockItem = styled.div`
    margin-bottom: 10px;
`
const TitleAddress = styled.span`
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 164.57%;
    color: #2E384C;
    margin-left: 10px;
`
const SubTitleAddress = styled.span`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #818591;
    margin-left: 25px;
`
const SubTitleBlock = styled.div`

`
const SelectAddress = (props) => {
  const { addressList } = props
  return (
    <RadioBlock>
      {addressList.map((addressItem, key) => {
        const phone = path(['phone'], addressItem)
        const contactPerson = path(['contactPerson'], addressItem)
        const address = path(['address'], addressItem)
        return (
          <RadioBlockItem key={key}>
            <input type="radio" name="address" value="first-add" />
            <TitleAddress>{address}</TitleAddress>
            <SubTitleBlock>
              <SubTitleAddress>{phone}</SubTitleAddress>
              <SubTitleAddress>{contactPerson}</SubTitleAddress>
            </SubTitleBlock>
          </RadioBlockItem>
        )
      })}
    </RadioBlock>
  )
}

export default SelectAddress
