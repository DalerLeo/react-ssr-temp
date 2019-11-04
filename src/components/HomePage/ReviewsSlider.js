import _ from 'lodash'
import React, { Component } from 'react'
import Carousel from 'antd/lib/carousel'
import classNames from 'classnames'
import ArrowLeft from '../../icons/ArrowLeft'
import ArrowRight from '../../icons/ArrowRight'
import ImageMan1 from '../../images/rev1.png'
import ImageWoman from '../../images/rev2.png'
import ImageMan2 from '../../images/rev3.png'
import hexToRgb from '../../helpers/hexToRgb'
import { BLACK_COLOR } from '../../constants/styles'

const carouselNavStyles = {
  height: '36px',
  width: '22px',
  fill: hexToRgb(BLACK_COLOR, '0.35')
}

const imagesArray = [ImageWoman, ImageMan1, ImageMan2]

export default class ReviewsSlider extends Component {
  constructor (props) {
    super(props)
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
  }
  next () {
    this.slider.slick.slickNext()
  }
  previous () {
    this.slider.slick.slickPrev()
  }
  render () {
    const { classes, settings, currentSlide, updateSlide, reviewArray } = this.props
    return (
      <div className={classes.reviews}>
        <ArrowLeft onClick={this.previous} className={classNames(classes.arrow, classes.leftArrow)} style={carouselNavStyles} />
        <Carousel
          ref={c => this.slider = c}
          beforeChange={(from, to) => {
            updateSlide(to)
          }}
          {...settings}
        >
          {_.map(reviewArray, (item, index) => {
            const image = imagesArray[index]
            return (
              <div key={index}>
                <div className={index === currentSlide ? classes.carouselItemActive : classes.carouselItem}>
                  <div className={classes.image} style={{ backgroundImage: 'url(' + image + ')' }} />
                  <div className={classes.title}>{_.get(item, 'name')}</div>
                  <div className={classes.position}>{_.get(item, 'position')}</div>
                </div>
              </div>
            )
          })}
        </Carousel>
        <ArrowRight onClick={this.next} className={classNames(classes.arrow, classes.rightArrow)} style={carouselNavStyles} />
      </div>
    )
  }
}
