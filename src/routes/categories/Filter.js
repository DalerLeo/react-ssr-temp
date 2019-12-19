import React from 'react'
import styled from 'styled-components'
import { pathOr } from 'ramda'
import Checkbox, { CheckboxGroup } from 'components/UI/Checkbox'
import Tags from './Tags'

const FilterBlock = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
`
const TagBlock = styled.div`
  padding: 20px 10px;
`
const TagsContentBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${props => props.count > 13 ? '400px' : 'auto'};
  overflow-y: scroll;
  overflow-x: hidden;
  margin-right: 10px;
  margin-bottom: 20px;
  padding: 10px;
`
const TagCancel = styled.button`
    background: #EAEBED;
    border-radius: 4px;
    border: 0;
    width: 100%;
    padding: 10px 0;
    cursor: pointer;
    outline: 0;
`

const Filter = props => {
  const { data, onChange } = props
  const items = pathOr([], ['brands'], data)
  const itemsCount = pathOr(0, ['length'], items)
  const countries = pathOr([], ['country'], data)
  const countryCount = pathOr(0, ['length'], countries)
  const options = pathOr([], ['option'], data)
  return (
    <FilterBlock>
      <TagBlock>
        <TagsContentBlock>
          <Tags label="Apple" />
          <Tags label="1.0 кг" />
          <Tags label="Samsun" />
          <Tags label="1" />
          <Tags label="1" />
        </TagsContentBlock>
        <TagCancel>
          Сбросить все
        </TagCancel>
      </TagBlock>
      <CheckboxGroup
        label="Бранд"
        mode="column"
        count={itemsCount}
        onChange={values => onChange('brand', values)}
      >
        {items.map((item, key) => (
          <Checkbox key={key} value={item.id} label={item.name} />
        ))}
      </CheckboxGroup>
      <CheckboxGroup
        label="Страна"
        mode="column"
        count={countryCount}
        onChange={values => onChange('country', values)}
      >
        {countries.map((item, key) => (
          <Checkbox key={key} value={item.id} label={item.name} />
        ))}
      </CheckboxGroup>

      {options.map((option, key) => {
        const optionValues = pathOr([], ['optionValues', 'values'], option)
        const optionsCount = optionValues.length
        return (
          <CheckboxGroup
            key={key}
            label={option.name}
            mode="column"
            count={optionsCount}
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
