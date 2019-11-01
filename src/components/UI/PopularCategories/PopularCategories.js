import React from 'react'
import styled from 'styled-components'
import img1 from 'images/popular.png'

const PopularBlock = styled.div`
  display: flex;
`
const PopularStyled = styled.div`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background-color: #F2F2F2;
  margin-left: 25px;
  &:nth-child(1){
    margin-left: 0;
  }
`
const PopularImage = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-top: 20px;
    max-width: 140px;
    max-height: 140px;
    
`
const PopularCategories = () => {
  return (
    <PopularBlock>
      <PopularStyled>
        <PopularImage src={img1} alt="image" />
      </PopularStyled>
      <PopularStyled>
        <PopularImage src={img1} alt="image" />
      </PopularStyled>
      <PopularStyled>
        <PopularImage src={img1} alt="image" />
      </PopularStyled>
      <PopularStyled>
        <PopularImage src={img1} alt="image" />
      </PopularStyled>
      <PopularStyled>
        <PopularImage src={img1} alt="image" />
      </PopularStyled>
      <PopularStyled>
        <PopularImage src={img1} alt="image" />
      </PopularStyled>
    </PopularBlock>
  )
}
export default PopularCategories
