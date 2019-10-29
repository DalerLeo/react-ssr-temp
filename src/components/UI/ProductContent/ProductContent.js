import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ProductContentStyled = styled.div`
    color: #242F3B;
    font-size: 14px;
    line-height: 129.96%;
`

const ProductContent = (props) => {
  const { content } = props
  return (
    <ProductContentStyled>
      {content}
    </ProductContentStyled>
  )
}

ProductContent.propTypes = {
  content: PropTypes.string
}

export default ProductContent
