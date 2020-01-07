import React from 'react'
import styled from 'styled-components'
import img1 from 'images/popular.png'
import img2 from 'images/fruits.png'

const PopularCategoryBlock = styled.div`
  display: flex;
  justify-content: space-between;
`
const CategoryItem = styled.div`
  width: 15%;
  cursor: pointer;
  
`
const CategoryImage = styled.div`
  width: 170px;
  height: 170px;
  background-color: #F2F2F2;
  border-radius: 50%;
  position: relative;
`
const Image = styled.img`
  position: absolute;
  top: 15%;
  left: 10%;
`
const CategoryName = styled.div`
  font-size: 18px;
  line-height: 129.96%;
  text-align: center;
  color: #2E384C;
  mix-blend-mode: normal;
  margin-top: 25px;
  :hover{
    color: #13885F;
  }
`
const PopularCategories = (props) => {
  return (

    <PopularCategoryBlock>
      <CategoryItem>
        <CategoryImage>
          <Image src={img1} alt="categories" />
        </CategoryImage>
        <CategoryName>
        Овощи
        </CategoryName>
      </CategoryItem>
      <CategoryItem>
        <CategoryImage>
          <Image src={img2} alt="categories" />
        </CategoryImage>
        <CategoryName>
        Фрукты
        </CategoryName>
      </CategoryItem>
      <CategoryItem>
        <CategoryImage>
          <Image src={img1} alt="categories" />
        </CategoryImage>
        <CategoryName>
        Мясные продукты
        </CategoryName>
      </CategoryItem>
      <CategoryItem>
        <CategoryImage>
          <Image src={img1} alt="categories" />
        </CategoryImage>
        <CategoryName>
        Детское питание
        </CategoryName>
      </CategoryItem>
      <CategoryItem>
        <CategoryImage>
          <Image src={img1} alt="categories" />
        </CategoryImage>
        <CategoryName>
        Бакалея
        </CategoryName>
      </CategoryItem>
      <CategoryItem>
        <CategoryImage>
          <Image src={img1} alt="categories" />
        </CategoryImage>
        <CategoryName>
        Полуфабрикаты
        </CategoryName>
      </CategoryItem>
    </PopularCategoryBlock>
  )
}

export default PopularCategories
