import React from 'react'
import styled from 'styled-components'

const TextAreaField = styled.textarea`
    height: 100px;
    margin: 20px 100px;
    border-radius: 7px;
    padding: 10px;
    float: right;
`
const TextArea = (props) => {
  console.warn(props)
  return (
    <TextAreaField rows="10" cols={props.cols} placeholder=" Напишите ваш отзыв" />
  )
}

export default TextArea
