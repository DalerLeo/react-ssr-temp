import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import ArrowLeft from '../../../icons/ArrowLeft'
import ArrowRight from '../../../icons/ArrowRight'

const ProductsTitlePosotion = styled.div`
    display: flex;
    justify-content: space-between;
    
`
const NextPrevButtonsBlock = styled.div`
    display: flex;
    margin-top: 20px;
`
const NextPrevButton = styled.button`
    border: none;
    background: white;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    outline: 0;
    cursor: pointer;
    margin-left: 10px;
`
const ProductsTitle = (props) => {
  const { pagination, title } = props
  return (
    <ProductsTitlePosotion>
      {pagination &&
      <NextPrevButtonsBlock>
        <NextPrevButton>
          <ArrowLeft />
        </NextPrevButton>
        <NextPrevButton>
          <ArrowRight />
        </NextPrevButton>
      </NextPrevButtonsBlock>}
    </ProductsTitlePosotion>
  )
}
ProductsTitle.propTypes = {
  pagination: propTypes.bool
}

export default ProductsTitle
