import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ButtonStyled = styled.button`
    background: #C7F9DD;
    border-radius: 7px;
    height: 46px;
    width: 112px;
    border: none;
    outline: 0;
    cursor: pointer;
`
const ButtonText = styled.div`
    color: #13885F;
`
const Button = (props) => {
  const { label } = props
  return (
    <ButtonStyled>
      <ButtonText>
        {label}
      </ButtonText>
    </ButtonStyled>
  )
}

Button.propTypes = {
  label: PropTypes.string
}

export default Button
