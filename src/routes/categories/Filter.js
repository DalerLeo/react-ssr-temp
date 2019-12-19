import React from 'react'
import styled from 'styled-components'
import { pathOr } from 'ramda'

import Checkbox, { CheckboxGroup } from 'components/UI/Checkbox'

const FilterBlock = styled.div`
  display: flex;
  flex-direction: column;
`
const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  console.warn('options', options)
  return (
    <FilterBlock>
      <CheckboxGroup
        label="Бранд"
        mode="column"
        onChange={values => onChange('brand', values)}
      >
        {items.map((item, key) => (
          <Checkbox key={key} value={item.id} label={item.name} />
        ))}
      </CheckboxGroup>
      <CheckboxGroup
        label="Страна"
        mode="column"
        onChange={values => onChange('country', values)}
      >
        {countries.map((item, key) => (
          <Checkbox key={key} value={item.id} label={item.name} />
        ))}
      </CheckboxGroup>

      {options.map((option, key) => {
        const optionValues = pathOr([], ['optionValues', 'values'], option)
        return (
          <CheckboxGroup
            key={key}
            label={option.name}
            mode="column"
            onChange={values => onChange('country', values)}
          >
            {optionValues.map((item, subKey) => (
              <Checkbox key={subKey} value={item.id} label={item.name} />
            ))}
          </CheckboxGroup>
        )
      })}
    </FilterBlock>
  )
}

export default Filter
