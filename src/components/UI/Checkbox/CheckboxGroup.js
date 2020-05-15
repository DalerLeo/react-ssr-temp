import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { SwitchContainer } from '../Switches'

const Label = styled.div`
  color: #4F4F4F;
  margin-bottom: 10px;
  font-weight: 500;
  text-transform: uppercase;
`
const Group = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${props => props.count > 7 ? '200px' : 'auto'};
  overflow-y: scroll;
  overflow-x: hidden;
  margin-right: 10px;
`
const HeaderBlock = styled.div`
  margin-top: 14px;
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #EFEFEF;
`

const Checkboxes = styled('div')`
  ${props =>
    props.mode === 'inline' &&
    css`
      display: flex;
      flex-wrap: wrap;
      margin-bottom: -12px;
      & ${SwitchContainer} {
        margin-right: 25px;
        &:last-child {
          margin-bottom: 12px;
        }
      }
    `}
`

const CheckboxGroup = props => {
  const { value, children, label, onChange, mode, count, ...rest } = props
  const [checkedValues, setCheckedValues] = React.useState(value)

  React.useEffect(() => {
    setCheckedValues(value)
  }, [value])

  const onChangeItem = (v, isChecked) => {
    const formedValues = isChecked
      ? [...checkedValues, v]
      : checkedValues.filter(item => item !== v)
    setCheckedValues(formedValues)
    if (typeof onChange === 'function') {
      onChange(formedValues)
    }
  }

  return (
    <div>
      <HeaderBlock>
        <Label>{label}</Label>
      </HeaderBlock>
      <Group count={count}>
        <Checkboxes mode={mode}>
          {React.Children.map(children, (child, key) => {
            const checkboxProps = child.props
            const childValue = checkboxProps.value
            return React.cloneElement(child, {
              key,
              ...checkboxProps,
              checked: checkedValues.includes(childValue),
              onChange: isChecked => onChangeItem(childValue, isChecked)
            })
          })}
        </Checkboxes>
      </Group>
    </div>
  )
}

CheckboxGroup.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  mode: PropTypes.oneOf(['inline', 'block'])
}

CheckboxGroup.defaultProps = {
  mode: 'inline',
  value: []
}

export default CheckboxGroup
