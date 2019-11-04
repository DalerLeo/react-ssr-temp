import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import Slider from 'react-slick'
import ProductsTitle from '../ProductsTitle'
import ArrowLeft from '../../../icons/ArrowLeft'
import ArrowRight from '../../../icons/ArrowRight'
import img1 from 'images/popular.png'

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
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style,
        display: 'block',
        height: '38px',
        width: '38px',
        borderRadius: '50%',
        position: 'absolute',
        top: '-40px',
        right: '0',
        Zindex: '100',
        background: 'white'
      }}
      onClick={onClick}
    >
      <ArrowRight style={{ position: 'absolute', left: '35%', top: '30%' }} />
    </div>
  )
}

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style,
        display: 'block',
        height: '38px',
        width: '38px',
        borderRadius: '50%',
        position: 'absolute',
        top: '-40px',
        left: '92%',
        Zindex: '200',
        background: 'white'
      }}
      onClick={onClick}
    >
      <ArrowLeft style={{ position: 'absolute', left: '25%', top: '30%' }} />
    </div>
  )
}
const PopularCategories = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  }
  return (
    <div>
      <ProductsTitle title="Популярные категории"/>
      <Slider {...settings}>
        <PopularStyled>
          <PopularImage src={img1} alt="image"/>
        </PopularStyled>
        <PopularStyled>
          <PopularImage src={img1} alt="image"/>
        </PopularStyled>
        <PopularStyled>
          <PopularImage src={img1} alt="image"/>
        </PopularStyled>
        <PopularStyled>
          <PopularImage src={img1} alt="image"/>
        </PopularStyled>
        <PopularStyled>
          <PopularImage src={img1} alt="image"/>
        </PopularStyled>
        <PopularStyled>
          <PopularImage src={img1} alt="image"/>
        </PopularStyled>
        <PopularStyled>
          <PopularImage src={img1} alt="image"/>
        </PopularStyled>
      </Slider>
    </div>
  )
}

PopularCategories.propTypes = {
  className: propTypes.string,
  style: propTypes.string,
  onClick: propTypes.func
}

export default PopularCategories
