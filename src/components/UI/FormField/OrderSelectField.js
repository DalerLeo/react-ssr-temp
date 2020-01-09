import React from 'react'
import styled from 'styled-components'
import { curry, path } from 'ramda'
import numberFormat from 'utils/numberFormat'

const Wrapper = styled.div`
    margin-left: -10px;
`
const Block = styled.div`
    background: #fff;
    width: calc(50% - 20px);
    margin: 0 10px;
    display: inline-block;
    border: 1px solid ${props => props.isActive ? props.theme.colors.primary.default : '#DBDBDD'};
    border-radius: 7px;
    cursor: pointer;
    padding: 10px 20px;
    min-height: 87px;
    vertical-align: top;
`
const TitleFlex = styled.div`
    display: flex;
    justify-content: space-between;
`
const Title = styled.div`
    font-size: 15px;
    font-weight: 500;
    line-height: 1.67;
`
const Prise = styled.div`
    color: #13885F;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.67;
`
const SubTitle = styled.div`
    color: #8492B0;
    margin: 3px 0;
    font-size: 13px;
    line-height: 1.38;
`

const EMPTY_OBJ = {}
const OrderSelectField = (props) => {
  const { input, data } = props
  const onChange = curry((value, ev) => input.onChange(value))

  return (
    <Wrapper>
      {data.map((item, key) => {
        const isActive = input.value && input.value.id === item.id
        const toggleItem = isActive ? EMPTY_OBJ : item
        const price = path(['price'], item) && numberFormat(path(['price'], item))
        const icon = path(['icon'], item)
        return (
          <Block
            isActive={isActive}
            key={item.id}
            onClick={onChange(toggleItem)}
          >
            {icon && icon.length > 0 ? <img src={icon} alt="icon" /> : null}
            <TitleFlex>
              <Title>{item.name}</Title>
              <Prise>{price} {price && 'сум'}</Prise>
            </TitleFlex>
            <SubTitle>
              {item.info || item.description}
            </SubTitle>
          </Block>
        )
      })}
    </Wrapper>
  )
}

export default OrderSelectField
