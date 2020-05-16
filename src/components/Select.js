import Dropdown from 'react-dropdown'
import React from 'react'
import PropTypes from 'prop-types'
import { intersection, prop, pipe, equals, not, filter, append, propEq, find } from 'ramda'
import Label from './StyledElems/Label'

const Select = props => {
  const { options, label, onChange, queryName, queryIds } = props
  const listIds = options.map(prop('value'))

  const intersect = pipe(
    intersection(queryIds),
    prop(0)
  )(listIds)

  const selected = find(propEq('value', intersect), options)

  const onSelect = ({ value }) => {
    const ids = pipe(
      filter(pipe(equals(intersect), not)),
      append(value)
    )(queryIds)

    onChange(queryName, ids)
  }
  return (
    <>
      <Label>{label}</Label>
      <Dropdown value={selected} options={options} onChange={onSelect} placeholder={label} />
    </>
  )
}
Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })),
  queryIds: PropTypes.array,
  label: PropTypes.string,
  onChange: PropTypes.func,
  queryName: PropTypes.string
}

export default Select
