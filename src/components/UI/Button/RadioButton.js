import React from 'react'
import styled from 'styled-components'

const Ul = styled.ul`
    list-style: none;
    background: #FDFDFD;
    border: 1px solid #EAEAEC;
    border-radius: 5px;
    padding: 5px 5px 5px 0;
    margin-top: -10px;
`
const Li = styled.li`
    display: inline-block;
`
const Lbb = styled.label`
    cursor: pointer;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 164.57%;
    color: #818591;
    margin-left: -6px;
`
const Inn = styled.input`
    visibility:hidden;
    transition: 2s;
    :checked + ${Lbb}{
        background: #2EBB8A;
        border-radius: 5px;
        padding: 4px 11px;
        color: #FFFFFF;
    }
`
const RadioButtonStyled = (props) => {
  return (

    <Ul>
      <Li>
        <Inn type="radio" value="1" name="radio" id="radio1" checked={true} />
        <Lbb for="radio1">Рус</Lbb>
      </Li>
      <Li>
        <Inn type="radio" value="2" name="radio" id="radio2" />
        <Lbb for="radio2">O‘zb</Lbb>
      </Li>
    </Ul>
  )
}

export default RadioButtonStyled
