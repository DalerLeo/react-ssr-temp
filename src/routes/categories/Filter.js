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
  const { data } = props
  console.warn('filter', data)
  const items = path(['brands'], data)
  return (
    <FilterWrapper>
      {items.map((item, key) => (
        <Checkbox name="brand" key={key} onChange={e => console.warn(e.target.id)} value="dasdsa" id={item.id}>{item.name}</Checkbox>
      ))}
    </FilterWrapper>
  )
}

export default Filter
