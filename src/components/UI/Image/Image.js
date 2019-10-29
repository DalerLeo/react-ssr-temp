import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ImageStyled = styled.img`
    display: flex;
    justify-content: center;
    max-width: 138px;
    max-height: 146px; 
`
const Image = (props) => {
  const { src } = props
  return (
    <ImageStyled src={src} />
  )
}

Image.propTypes = {
  src: PropTypes.string
}

export default Image
