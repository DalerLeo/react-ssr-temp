import _ from 'lodash'
import React from 'react'
import { compose, withState } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import Title from '../Title'
import { Button } from '../Button'
import ReviewsSlider from './ReviewsSlider'
import {
  ALTERNATE_COLOR,
  crossBrowserify,
  DISPLAY_FLEX,
  TEXT_COLOR_DEFAULT
} from '../../constants/styles'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'

const ZERO = 0
const enhance = compose(
  withState('currentSlide', 'updateSlide', ZERO),

  injectSheet({
    flex: DISPLAY_FLEX,
    alignCenter: crossBrowserify('alignItems', 'center'),
    alignBaseline: crossBrowserify('alignItems', 'baseline'),
    justifyCenter: crossBrowserify('justifyContent', 'center'),
    justifyBetween: crossBrowserify('justifyContent', 'space-between'),

    wrapper: {
      padding: '0 60px',
      maxWidth: '1280px',
      margin: '60px auto'
    },

    half: {

    },

    reviewInfo: {

    },

    reviews: {
      position: 'relative',
      margin: '40px'
    },

    arrow: {
      cursor: 'pointer',
      position: 'absolute',
      top: 'calc(50% - 18px)',
      zIndex: '2'
    },

    leftArrow: {
      left: '-40px'
    },

    rightArrow: {
      right: '-40px'
    },

    carousel: {
      position: 'relative'
    },

    carouselItem: _.merge({
      fontSize: '15px',
      textAlign: 'center',
      transform: 'scale(0.5)',
      opacity: '0.33'
    }, crossBrowserify('transition', 'all 200ms ease')),

    carouselItemActive: {
      extend: 'carouselItem',
      opacity: '1',
      transform: 'scale(1)'
    },

    image: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      borderBottom: '4px #a54bd8 solid',
      width: '100%',
      minHeight: '250px'
    },

    title: {
      fontStyle: 'italic',
      lineHeight: '20px',
      margin: '10px 0'
    },

    position: {

    },

    reviewTitle: {
      fontWeight: '600',
      fontSize: '60px',
      lineHeight: 'normal',
      padding: '0',
      color: ALTERNATE_COLOR,
      paddingBottom: '20px',
      '&:after': {
        background: ALTERNATE_COLOR,
        height: '5px'
      }
    },

    reviewText: {
      color: TEXT_COLOR_DEFAULT,
      fontSize: '20px'
    },

    downloadBtn: {
      background: ALTERNATE_COLOR,
      marginTop: '35px'
    }
  })
)

const reviewArray = [
  {
    name: 'Angelina Sargasyan',
    position: 'CEO Beeline',
    text: 'Corrupti eget occaecat illum accumsan dignissim officiis rerum facilis habitasse curabitur? Occaecati, minus quam, aliquip massa! Scelerisque purus sollicitudin, perspiciatis ab quidem justo ad lacus numquam quam nisi! Cras nam, dis amet vivamus eiusmod officia lorem pariatur ratione excepteur nobis, interdum dapibus netus inceptos? Vitae ligula aptent itaque sodales sunt.'
  },
  {
    name: 'Alexey Ivanovich',
    position: 'CEO Ucell',
    text: 'Ipsum facilisis cumque luctus auctor et etiam consequat aperiam, platea officia autem harum reiciendis, habitasse, libero totam morbi ornare? Mus, nulla non dolorum excepturi! Amet suscipit lorem? Magna consectetuer architecto necessitatibus vero! Debitis, varius dui expedita? Modi tempora. Ducimus quam delectus euismod vel nisl quia, euismod vestibulum enim. Esse purus.'
  },
  {
    name: 'Ibragim Alekseevich',
    position: 'CEO UMS',
    text: 'Ullamcorper maiores egestas urna pellentesque diamlorem sagittis rutrum cubilia ratione nonummy, condimentum. Tempus anim! Accumsan tristique etiam illum, laboris montes! Fugit, tenetur tempus per quod nec aperiam pulvinar quaerat porro. Nobis convallis, fusce, ullam rutrum voluptates, ut tenetur, maxime, tincidunt lobortis assumenda diamlorem non dolor cursus amet consectetuer officia provident.'
  }
]

const Reviews = ({ classes, currentSlide, updateSlide, data = reviewArray }) => {
  const carouselSettings = {
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    className: classes.carousel,
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
    // Responsive: [{
    //     Breakpoint: 1250,
    //     Settings: {
    //         SlidesToShow: 1
    //     }
    // }]
  }

  const reviewText = _.get(data, [currentSlide, 'text'])
  return (
    <div className={classes.wrapper}>
      <Title text={'Отзывы'}/>
      <Row type={'flex'} gutter={100}>
        <Col xs={24} sm={24} md={12} className={classNames(classes.half)}>
          <ReviewsSlider
            settings={carouselSettings}
            classes={classes}
            reviewArray={data}
            currentSlide={currentSlide}
            updateSlide={updateSlide}/>
        </Col>
        <Col xs={24} sm={24} md={12} className={classNames(classes.half, classes.reviewInfo)}>
          <Title text={'MyJob'} className={classes.reviewTitle}/>
          <div className={classes.reviewText}>{reviewText}</div>
          <Button
            className={classes.downloadBtn}
            text={'Скачать коммерческое предложение'}
            type={'medium'}/>
        </Col>
      </Row>
    </div>
  )
}

export default enhance(Reviews)
