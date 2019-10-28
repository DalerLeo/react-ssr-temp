import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const PriceStyled = styled.div`
    color: #2EBB8A;
    font-size: 18px;
    line-height: 129.96%;
`
const Price = (props) => {
  const { price } = props
  return (
    <PriceStyled>
      {price} сум
    </PriceStyled>
  )
}

Price.propTypes = {
  price: PropTypes.string
}

export default Price
