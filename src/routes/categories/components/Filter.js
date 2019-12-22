import React from 'react'
import styled from 'styled-components'
import { map, pathOr, pipe, split, propOr, filter } from 'ramda'
import PropTypes from 'prop-types'
import FilterTags from './FilterTags'
import FilterSection from './FilterSection'

const FilterBlock = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
`


const emptyStr = ''
const getIds = (data, key) => pipe(
  propOr(emptyStr, key),
  split('-'),
  filter(Boolean),
  map(Number)
)(data)

const defArr = []
const Filter = props => {
  const {
    data,
    onChange,
    queryParams,
    onReset,
    onItemReset
  } = props

  const brands = pathOr(defArr, ['brands'], data)
  const countries = pathOr(defArr, ['country'], data)
  const options = pathOr(defArr, ['option'], data)
  const brandIds = getIds(queryParams, 'brand')
  const countryIds = getIds(queryParams, 'country')
  const optionIds = getIds(queryParams, 'option')
  return (
    <FilterBlock>
      <FilterTags
        countries={countries}
        options={options}
        brands={brands}
        brandIds={brandIds}
        countryIds={countryIds}
        optionIds={optionIds}
        onReset={onReset}
        onItemReset={onItemReset}
      />
      <FilterSection
        label="Бранд"
        queryName="brand"
        ids={brandIds}
        list={brands}
        onChange={onChange}
      />
      <FilterSection
        label="Страна"
        queryName="country"
        ids={countryIds}
        list={countries}
        onChange={onChange}
      />
      {options.map((option, key) => {
        const optionValues = pathOr(defArr, ['optionValues', 'values'], option)
        return (
          <FilterSection
            key={option.id}
            label={option.name}
            queryName="option"
            list={optionValues}
            ids={optionIds}
            onChange={onChange}
          />
        )
      })}

    </FilterBlock>
  )
}

Filter.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  onReset: PropTypes.func,
  onItemReset: PropTypes.func,
  queryParams: PropTypes.object
}
export default Filter
