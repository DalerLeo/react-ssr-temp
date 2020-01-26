import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { path, find, propEq } from 'ramda'
import {
  SwitchContainer as SwitchContainerUI,
  SwitchInput,
  CheckMark
} from '../Switches'

const StyledCheckMark = styled(CheckMark)`
  ${props =>
    props.indeterminate &&
    css`
      border-color: #2EBB8A;
    `}
  :after {
    border-style: solid;
    border-color: #2EBB8A;
    border-width: 0 2px 2px 0;
    height: 7px;
    transform: rotate(45deg) scale(0);
    left: 7px;
    top: 4px;
    width: 3px;
    ${props =>
    props.indeterminate &&
      css`
        background: #2EBB8A;
        border: none;
        opacity: 1;
        transform: scale(1);
        left: 4px;
        top: 7px;
        height: 2px;
        width: 8px;
      `}
  }
`

const StyledInput = styled(SwitchInput)`
  :checked ~ span {
    color: #2EBB8A;
  }

  :checked + ${StyledCheckMark}:after {
    transform: rotate(45deg) scale(1);
  }
`
const SwitchContainer = styled(SwitchContainerUI)`
  ${props =>
    !props.label &&
  css`
      margin-bottom: 0;
      width: 18px;
      height: 18px;
      padding-left: 18px;
    `}
`

const Checkbox = ({ onChange, ...props }) => {
  const onChecked = ev => onChange && onChange(ev.target.checked, ev)
  return (
    <SwitchContainer disabled={props.disabled} label={props.label} {...props}>

      <StyledInput {...props} onChange={onChecked} type="checkbox" />
      <StyledCheckMark indeterminate={props.indeterminate} />
      <span>{props.label}</span>
    </SwitchContainer>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func,
  checked: PropTypes.bool
}

StyledCheckMark.propTypes = {
  error: PropTypes.bool
}

export default Checkbox