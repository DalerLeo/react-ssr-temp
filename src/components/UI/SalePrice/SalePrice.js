import React from 'react'
import styled from 'styled-components'

const StyledSalePrice = styled.span`
    font-size: 14px;
    line-height: 129.96%;
    color: #242F3B;

`
const DelPrice = styled.del`
    color: #2EBB8A;
    margin-right: 10px;
    margin-top: 5px;
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
