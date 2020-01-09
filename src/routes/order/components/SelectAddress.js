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
const Address = styled.input`
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px #efefef solid;
  display: inline-block;
  margin-right: 10px;
  background: #fff;
  cursor: pointer;
  border-color: ${props => props.isActive && props.theme.colors.primary.default};
`

const SelectAddress = (props) => {
  const { addressList, values, form } = props
  return (
    <RadioBlock>
      {addressList.map(address => {
        const addr = { ...address, client: address.client.id }
        const addrId = path(['address', 'id'], values)
        const phone = path(['phone'], address)
        const contactPerson = path(['contactPerson'], address)
        const addres = path(['address'], address)
        return (
          <RadioBlockItem key={address.id}>
            <input
              type="radio" name="address"
              isActive={address.id === addrId}
              onClick={() => form.change('address', addr)}
            />
            <TitleAddress>{addres}</TitleAddress>
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
