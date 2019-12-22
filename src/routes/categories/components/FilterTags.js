import React from 'react'
import styled from 'styled-components'
import DeleteIcon from 'icons/TagDelete'
import { SecondaryButton } from 'components/UI/Button'

import PropTypes from 'prop-types'

const Tags = styled.div`
  padding: 20px;
`
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

const Clear = styled.span`
  cursor: pointer;
`
const includes = (item, query) => query.includes(item.id)

const FilterTags = props => {
  const {
    brands,
    countries,
    options,
    brandIds,
    countryIds,
    onReset,
    onItemReset
  } = props

  const includedBrands = brands.filter(item => includes(item, brandIds))
  const includedCountries = countries.filter(item => includes(item, countryIds))
  return (
    <Tags>
      {includedBrands.map(brand => (
        <Tag key={brand.id}>
          <TagName>{brand.name}</TagName>
          <Clear onClick={() => onItemReset('brand', brand.id)}>
            <DeleteIcon />
          </Clear>
        </Tag>
      )
      )}
      {includedCountries.map(country => (
        <Tag key={country.id}>
          <TagName>{country.name}</TagName>
          <Clear onClick={() => onItemReset('country', country.id)}>
            <DeleteIcon />
          </Clear>
        </Tag>
      )
      )}
      <SecondaryButton onClick={onReset}>Сбросить все</SecondaryButton>
    </Tags>
  )
}

FilterTags.propTypes = {
  brands: PropTypes.array,
  countries: PropTypes.array,
  options: PropTypes.array,
  brandIds: PropTypes.array,
  countryIds: PropTypes.array,
  onReset: PropTypes.func,
  onItemReset: PropTypes.func
}

export default FilterTags
