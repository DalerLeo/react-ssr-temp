import _ from 'lodash'
import React, { Component } from 'react'
import Carousel from 'antd/lib/carousel'
import ArrowLeft from '../../icons/ArrowLeft'
import ArrowRight from '../../icons/ArrowRight'
import classNames from 'classnames'
import hexToRgb from '../../helpers/hexToRgb'
import { BLACK_COLOR } from '../../constants/styles'

const carouselNavStyles = {
  height: '36px',
  width: '22px',
  fill: hexToRgb(BLACK_COLOR, '0.35')
}

export default class TopCompaniesSlider extends Component {
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
    const { classes, settings } = this.props
    return (
      <div className={classes.companies}>
        <ArrowLeft onClick={this.previous} className={classNames(classes.arrow, classes.leftArrow)} style={carouselNavStyles}/>
        <Carousel ref={c => this.slider = c} {...settings}>
          {_.map(_.range(Number('6')), (item, index) => {
            const image = _.get(item, 'image')
            const kind = _.toUpper(_.get(item, 'kind'))
            const name = _.get(item, 'name') || 'OOO Ucell'
            return (
              <div key={index}>
                <div className={classes.carouselItem}>
                  <div className={classes.image} style={{ backgroundImage: 'url(' + image + ')' }}/>
                  <div className={classes.title}>{kind} {name}</div>
                </div>
              </div>
            )
          })}
        </Carousel>
        <ArrowRight onClick={this.next} className={classNames(classes.arrow, classes.rightArrow)} style={carouselNavStyles}/>
      </div>
    )
  }
}
