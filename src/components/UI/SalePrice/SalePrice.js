import React from 'react'
import styled from 'styled-components'

const StyledSalePrice = styled.span`
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 129.96%;
    color: #828282;
    mix-blend-mode: normal;
`
const DelPrice = styled.del`
    color: #828282;
    margin-bottom: 8px;
`

const SalePrice = () => {
  return (
    <DelPrice>
      <StyledSalePrice>
        25 000 сум
      </StyledSalePrice>
    </DelPrice>
  )
}

export default SalePrice
