import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Checkbox, { CheckboxGroup } from 'components/UI/Checkbox'
import { length } from 'ramda'
import equal from 'fast-deep-equal'

const FilterSection = props => {
  const { label, queryName, ids, onChange, list } = props
  const count = length(list)

  return (
    <CheckboxGroup
      label={label}
      mode="column"
      count={count}
      value={ids}
      onChange={values => onChange(queryName, values)}
    >
      {list.map((item) => (
        <Checkbox key={item.id} value={item.id} label={item.name} />
      ))}
    </CheckboxGroup>
  )
}

FilterSection.propTypes = {
  queryName: PropTypes.string,
  label: PropTypes.string,
  ids: PropTypes.array,
  onChange: PropTypes.func,
  list: PropTypes.array
}
export default memo(FilterSection, equal)
