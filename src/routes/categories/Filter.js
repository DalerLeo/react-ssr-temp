import React from 'react'
import styled from 'styled-components'
import { path, map } from 'ramda'

import Checkbox from '../../components/UI/Checkbox/Checkbox'

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%
`

const Filter = props => {
  const { filterList } = props
  const items = path(['brands'], filterList)
  return (
    <FilterWrapper>
      {items.map((item, key) => (
        <Checkbox name="brand" key={key}>{item.name}</Checkbox>
      ))}
    </FilterWrapper>
  )
}

export default Filter
