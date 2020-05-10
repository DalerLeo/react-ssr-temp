import styled from 'styled-components'
import React from 'react'

const Card = styled.div`
  background-color: #FFF;
  border-left: ${props => props.theme.cardBorder};
  padding: 12px;
  width: 25%;
  :first-child {
  border-left: none;

  }
`

const Loader = styled.div`
  border-radius: 8px;
  height: ${({ height = '20px' }) => height};
  max-width: ${props => props.width};
  width: 100%;
  margin-top: 20px;
  background-color: #efefef;
  background: linear-gradient(-45deg, #fff, #efefef);
	background-size: 400% 400%;
	animation: gradientBG 1s ease infinite;
    @keyframes gradientBG {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`

const ProductPlaceholder = props => {
  return (
    <Card>
      <Loader />
      <Loader />
      <Loader />
      <Loader />
    </Card>
  )
}

export default ProductPlaceholder
