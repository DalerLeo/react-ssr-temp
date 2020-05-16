import React, { useState } from 'react'
import styled from 'styled-components'
import PlusIcon from 'icons/Plus'
import MinusIcon from 'icons/Minus'

const StyledCartButton = styled.div`
    display: flex;
    background: #FFDD2D;
    border: 1px solid #FFDD2D;
    justify-content: space-between;
    border-radius: 7px;
    height: 55px;
    width: 187px;
    outline: 0;
    cursor: pointer;
`
const MinusButton = styled.button`
    background-color: transparent;
    border: none;
    outline: 0;
    cursor: ${props => props.counter === 1 ? 'no-drop' : 'pointer'};
`
const PlusButton = styled.button`
    background-color: transparent;
    border: none;
    outline: 0;
    cursor: pointer;
`
const Counter = styled.div`
    font-size: 16px;
    line-height: 129.96%;
    text-align: center;
    color: #242F3B;
    margin-top: 11px;
`
const CartButton = (props) => {
  const { amount, onChange } = props

  const [counter, setCounter] = useState(amount)

  const onSubtract = () => {
    const value = counter - 1
    setCounter(value)
    onChange && onChange(value)
  }
  const onAdd = () => {
    const value = counter + 1
    setCounter(value)
    onChange && onChange(value)
  }
  return (
    <StyledCartButton>
      <MinusButton counter={counter} onClick={onSubtract} disabled={counter === 0}>
        <MinusIcon />
      </MinusButton>
      <Counter>
        {counter}
      </Counter>
      <PlusButton onClick={onAdd}>
        <PlusIcon />
      </PlusButton>
    </StyledCartButton>
  )
}

export default CartButton
