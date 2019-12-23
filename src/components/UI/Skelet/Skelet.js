import React from 'react'
import styled from 'styled-components'
import { range } from 'ramda'

const SkeletCardBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const SkeletCard = styled.div`
    background-color: #FFF;
    height: 396px;
    width: 33%;
    border-right: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
    border-top-left-radius: 5px;
  &:nth-child(3) {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  &:nth-child(3n) {
    border-right: none;
  }
`
const SkeletImage = styled.div`
    display: flex;
    margin: auto;
    margin-top: 20px;
    background-color: #efefef;
    width: 150px;
    height: 150px;
    border-radius: 5px;
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
const SkeletPriceBlock = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-evenly;
`
const SkeletPrice = styled.div`
    background-color: #efefef;
    height: 20px;
    width: 100px;
    border-radius: 5px;
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
const SkeletSalePrice = styled.div`
    background-color: #efefef;
    height: 20px;
    width: 100px;
    border-radius: 5px;
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
const SkeletContent = styled.div`
    background-color: #efefef;
    height: 80px;
    width: 80%;
    margin: auto;
    margin-top: 20px;
    border-radius: 5px;
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

const SkeletButton = styled.div`
    margin-top: 20px;
    background-color: #efefef;
    height: 40px;
    width: 40%;
    margin-left: 28px;
    border-radius: 5px;
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
const Skelet = (props) => {
  const { count } = props
  const number = range(1, count)
  return (
    <SkeletCardBlock>
      {number.map((num, key) => (
        <SkeletCard key={key}>
          <SkeletImage />
          <SkeletPriceBlock>
            <SkeletPrice />
            <SkeletSalePrice />
          </SkeletPriceBlock>
          <SkeletContent />
          <SkeletButton />
        </SkeletCard>
      ))}

    </SkeletCardBlock>
  )
}

export default Skelet
