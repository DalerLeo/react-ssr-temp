import React from 'react'
import styled from 'styled-components'
import { map, pathOr, pipe, split, propOr, filter } from 'ramda'
import PropTypes from 'prop-types'
import TyreParams from 'icons/TyreParams'
import Select from 'components/Select'

import { TYRE } from '../../../constants/backend'
import FilterSection from './FilterSection'

const FilterBlock = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
`

const Reset = styled.div`
  border: 1px solid;
  border-radius: ${props => props.theme.borderRadius};
  padding: 5px 0;
  width: 100%;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
`
const emptyStr = ''
const getIds = (data, key) => pipe(
  propOr(emptyStr, key),
  split('-'),
  filter(Boolean),
  map(Number)
)(data)

const defArr = []

const mapOptions = values => values.map(value => ({ label: value.name, value: value.id }))
const Filter = props => {
  const {
    data,
    onChange,
    queryParams,
    onReset,
    categoryCode
  } = props

  const optionIds = getIds(queryParams, 'option')
  const brands = pathOr(defArr, ['brands'], data)
  const countries = pathOr(defArr, ['country'], data)
  const options = pathOr(defArr, ['option'], data)
  const brandIds = getIds(queryParams, 'brand')
  const countryIds = getIds(queryParams, 'country')
  return (
    <FilterBlock>
      {categoryCode === TYRE && <TyreParams />}
      {options.map(option => (
        <Select
          label={option.name}
          queryIds={optionIds}
          key={option.id}
          queryName="option"
          onChange={onChange}
          options={mapOptions(option.optionValues.values)}
        />
      ))}

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
      <Reset onClick={onReset}>Reset</Reset>
    </FilterBlock>

  )
}

Filter.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  onReset: PropTypes.func,
  categoryCode: PropTypes.string,
  queryParams: PropTypes.object
}
export default Filter
