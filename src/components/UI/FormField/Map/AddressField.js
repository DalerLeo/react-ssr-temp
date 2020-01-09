import React from 'react'
import styled from 'styled-components'

import Input from '../../Input/Input'
import LocationIcon from '../../../../icons/Location'

const LocationBlock = styled.div`
  display: flex;
  cursor: pointer;
`
const LocationText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 129.96%;
  text-align: center;
  color: #2E384C;
  margin-left: 5px;
`

const InputWrap = styled.div`
  width: calc(100% - 180px);
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const AddressField = props => {
  const { onIconClick, input } = props

  return (
    <Wrapper>
      <InputWrap>
        <Input {...input} label="Введите или выберите на карте адрес доставки" />
      </InputWrap>
      <LocationBlock onClick={onIconClick}>
        <LocationIcon />
        <LocationText>Указать на карте</LocationText>
      </LocationBlock>
    </Wrapper>

  )
}

export default AddressField
