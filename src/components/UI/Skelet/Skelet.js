import React from 'react'
import styled from 'styled-components'

const SkeletButton = styled.div`
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
const Card = styled.div`
  background-color: #FFF;
  border-left: ${props => props.theme.cardBorder};
  padding: 12px;
  width: ${props => props.column === 3 ? 'calc(100% / 3)' : '25%'};
  :first-child {
  border-left: none;

  }
`
const CardLoader = props => {

}
const Skelet = (props) => {
  const { count, column = 4 } = props

  return (
    <div>
      <Card column={column}>
        <SkeletButton />
        <SkeletButton />
        <SkeletButton />
        <SkeletButton />
      </Card>

    </div>
  )
}

export default Skelet
