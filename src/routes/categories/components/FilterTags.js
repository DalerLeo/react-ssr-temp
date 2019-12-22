import React from 'react'
import styled from 'styled-components'
import DeleteIcon from 'icons/TagDelete'
import { pathOr, split, pipe, map } from 'ramda'

import PropTypes from 'prop-types'

const Tag = styled.div`
  display: inline-block;
  background: #EAEBED;
  border-radius: 16px;
  padding: 7px;
  margin-bottom: 10px;
  margin-right: 10px;
`

const TagName = styled.span`
  padding-right: 15px;
`
const includes = (item, query) => query.includes(item.id)

const FilterTags = props => {
  const {
    brands,
    countries,
    options,
    brandIds,
    countryIds
  } = props

  const includedBrands = brands.filter(item => includes(item, brandIds))
  const includedCountries = countries.filter(item => includes(item, countryIds))
  return (
    <div>
      {includedBrands.map(brand => (
        <Tag
          key={brand.id}
        >
          <TagName>{brand.name}</TagName>
          <DeleteIcon />
        </Tag>
      )
      )}
      {includedCountries.map(country => (
        <Tag
          key={country.id}
        >
          <TagName>{country.name}</TagName>
          <DeleteIcon />
        </Tag>
      )
      )}
    </div>
  )
}

FilterTags.propTypes = {
  brands: PropTypes.array,
  countries: PropTypes.array,
  options: PropTypes.array,
  brandIds: PropTypes.array,
  countryIds: PropTypes.array
}

export default FilterTags
