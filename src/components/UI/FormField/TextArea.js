import React from 'react'
import styled from 'styled-components'

const TextAreaField = styled.textarea`
    height: 100px;
    border-radius: 7px;
    padding: 10px;
    float: right;
    width: 100%;
    border: 1px solid #D9DBDE;
    outline: 0;
    background-color: #FAFAFA;
`
const TextArea = (props) => {
  return (
    <TextAreaField {...props.input} rows="10" placeholder=" Напишите ваш отзыв" />
  )
}

export default TextArea
