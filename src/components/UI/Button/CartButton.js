import React, { useState } from 'react'
import styled from 'styled-components'
import PlusIcon from 'icons/Plus'
import MinusIcon from 'icons/Minus'

const StyledCartButton = styled.div`
    display: flex;
    justify-content: space-between;
    border-radius: 7px;
    height: 46px;
    width: 112px;
    border: 1px solid #C7F9DD;
    outline: 0;
    cursor: pointer;
    margin-top: 10px;
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
  const [counter, setCounter] = useState(2)

  return (
    <StyledCartButton>
      <MinusButton counter={counter} onClick={() => setCounter(counter - 1)} disabled={counter === 1}>
        <MinusIcon />
      </MinusButton>
      <Counter>
        {counter}
      </Counter>
      <PlusButton onClick={() => setCounter(counter + 1)}>
        <PlusIcon />
      </PlusButton>
    </StyledCartButton>
  )
}

export default CartButton
