import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import InputLabel from '../InputLabel'
import { SwitchContainer } from '../Switches'

const Group = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${props => props.count > 13 ? '400px' : 'auto'};
  overflow-y: scroll;
  overflow-x: hidden;
  margin-right: 10px;
  margin-bottom: 20px;
  padding: 0 10px;
`
const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #EFEFEF;
  padding: 10px;
`
const Count = styled.div`
  font-weight: 500;
  font-size: 15px;
  line-height: 129.96%;
  color: #979BA5;
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

  const onChangeItem = (value, isChecked) => {
    const formedValues = isChecked
      ? [...checkedValues, value]
      : checkedValues.filter(item => item !== value)
    setCheckedValues(formedValues)
    if (typeof onChange === 'function') {
      onChange(formedValues)
    }
  }

  return (
    <div>
      <HeaderBlock>
        <InputLabel>{label}</InputLabel>
        <Count>{count}</Count>
      </HeaderBlock>
      <Group {...rest} count={count}>
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
