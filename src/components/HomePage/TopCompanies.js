import _ from 'lodash'
import React from 'react'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import Title from '../Title'
import TopCompaniesSlider from './TopCompaniesSlider'
import {
  crossBrowserify,
  DISPLAY_FLEX,
  WHITE_COLOR
} from '../../constants/styles'
import hexToRgb from '../../helpers/hexToRgb'

const enhance = compose(

  injectSheet({
    flex: DISPLAY_FLEX,
    alignCenter: crossBrowserify('alignItems', 'center'),
    alignBaseline: crossBrowserify('alignItems', 'baseline'),
    justifyCenter: crossBrowserify('justifyContent', 'center'),
    justifyBetween: crossBrowserify('justifyContent', 'space-between'),

    companiesWrapper: {
      marginTop: '20px'
    },

    companies: {
      position: 'relative'
    },

    arrow: {
      cursor: 'pointer',
      position: 'absolute',
      top: 'calc(50% - 18px)',
      zIndex: '2'
    },

    leftArrow: {
      left: '0'
    },

    rightArrow: {
      right: '0'
    },

    carousel: {
      '& .slick-list': {
        margin: '0 -15px',
        padding: '15px 0',
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          bottom: '0',
          width: '200px',
          zIndex: '2',
          fallbacks: [
            { background: '-moz-linear-gradient(right, ' + hexToRgb(WHITE_COLOR, '0') + ' 0%, ' + hexToRgb(WHITE_COLOR) + ' 100%)' },
            { background: '-webkit-linear-gradient(right, ' + hexToRgb(WHITE_COLOR, '0') + ' 0%, ' + hexToRgb(WHITE_COLOR) + ' 100%)' },
            { background: 'linear-gradient(to left, ' + hexToRgb(WHITE_COLOR, '0') + ' 0%,' + hexToRgb(WHITE_COLOR) + ' 100%)' }
          ]
        },
        '&:after': {
          content: '""',
          position: 'absolute',
          top: '0',
          right: '0',
          bottom: '0',
          width: '200px',
          zIndex: '2',
          fallbacks: [
            { background: '-moz-linear-gradient(left, ' + hexToRgb(WHITE_COLOR, '0') + ' 0%, ' + hexToRgb(WHITE_COLOR) + ' 100%)' },
            { background: '-webkit-linear-gradient(left, ' + hexToRgb(WHITE_COLOR, '0') + ' 0%, ' + hexToRgb(WHITE_COLOR) + ' 100%)' },
            { background: 'linear-gradient(to right, ' + hexToRgb(WHITE_COLOR, '0') + ' 0%,' + hexToRgb(WHITE_COLOR) + ' 100%)' }
          ]
        }
      }
    },

    carouselItem: _.merge({
      background: WHITE_COLOR,
      borderRadius: '7px',
      textAlign: 'center',
      overflow: 'hidden',
      margin: '0 15px',
      '& h3': {
        color: WHITE_COLOR
      }
    }, crossBrowserify('boxShadow', '3px 6px 15px rgba(0, 0, 0, 0.16)')),

    image: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: '130px',
      background: '#ccc'
    },

    title: {
      fontStyle: 'italic',
      padding: '12px 8px 20px 8px'
    },

    '@media (max-width: 1000px)': {
      carousel: {
        '& .slick-list': {
          '&:before': {
            display: 'none'
          },
          '&:after': {
            display: 'none'
          }
        }
      }
    }
  })
)

const TopCompanies = ({ classes, data }) => {
  const carouselSettings = {
    arrows: false,
    className: classes.carousel,
    dots: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1600,
      settings: {
        slidesToShow: 5
      }
    }, {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4
      }
    }, {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 1000,
      settings: {
        slidesToShow: 1
      }
    }, {
      breakpoint: 550,
      settings: {
        slidesToShow: 1
      }
    }]
  }
  return (
    <div className={classes.companiesWrapper}>
      <Title text={'Топ компаний'}/>
      <TopCompaniesSlider
        classes={classes}
        data={data}
        settings={carouselSettings}/>
    </div>
  )
}

export default enhance(TopCompanies)
