import React from 'react'
import styled from 'styled-components'
import { pathOr } from 'ramda'

import Checkbox from '../../components/UI/Checkbox/Checkbox'

const FilterBlock = styled.div`
  display: flex;
  flex-direction: column;
`
const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 1px solid lightgrey;
  border-radius: 7px;
  margin-right: 10px;
  margin-bottom: 20px;
  padding: 10px;
`

const Filter = props => {
  const { data, onChange } = props
  const items = pathOr([], ['brands'], data)
  const countries = pathOr([], ['country'], data)
  const options = pathOr([], ['option'], data)
  return (
    <FilterBlock>
      <FilterWrapper>
        {items.map((item, key) => (
          <Checkbox name="brand" key={key} onChange={event => onChange('brand', event.target.id)} id={item.id}>{item.name}</Checkbox>
        ))}
      </FilterWrapper>
      <FilterWrapper>
        {countries.map((item, key) => (
          <Checkbox name="country" key={key} onChange={event => onChange('country', event.target.id)} id={item.id}>{item.name}</Checkbox>
        ))}
      </FilterWrapper>
      {options.map((option, key) => {
        const optionValues = pathOr([], ['optionValues', 'values'], option)
        return (
          <FilterWrapper key={key}>
            {optionValues.map((item, subKey) => (
              <Checkbox name="options" key={subKey} onChange={event => onChange('options', event.target.id)} id={item.id}>{item.name}</Checkbox>
            ))}
          </FilterWrapper>
        )
      })}
    </FilterBlock>
  )
}

export default Filter
