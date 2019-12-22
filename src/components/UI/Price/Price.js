import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import numberFormat from 'utils/numberFormat'
const PriceStyled = styled.div`
    color: #2EBB8A;
    font-size: 18px;
    line-height: 129.96%;
`
const Price = (props) => {
  const { price } = props
  return (
    <PriceStyled>
      {numberFormat(price)} сум
    </PriceStyled>
  )
}

Price.propTypes = {
  price: PropTypes.string
}

export default Price
