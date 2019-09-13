import _ from 'lodash'
import fp from 'lodash/fp'
import React, { useRef } from 'react'
import sprintf from 'sprintf'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import Link from 'components/Link'
import {
  crossBrowserify,
  fallbacksStyle,
  BLACK_COLOR,
  PRIMARY_COLOR,
  MAIN_COLOR,
  ANCHOR_DISABLED,
  MAIN_BORDER
} from 'constants/styles'
import { ARTICLES_URL, ARTICLES_ITEM_URL } from 'constants/routes'
import hexToRgb from 'helpers/hexToRgb'
import Carousel from 'antd/lib/carousel'
import ChevronLeft from 'icons/ChevronLeft'
import ChevronRight from 'icons/ChevronRight'
import Title from 'components/Title'
import MoreButton from 'components/MoreButton'
import T from 'components/T'

const enhance = compose(
  injectSheet({
    wrapper: {
      position: 'relative',
      marginTop: '60px'
    },
    carousel: {
      margin: '0 -10px',
      '& .slick-dots': {
        display: 'none',
        position: 'unset',
        margin: '70px 0',
        '& li': {
          margin: '0 1px',
          '&.slick-active': {
            '& button': {
              background: PRIMARY_COLOR,
              width: '100px'
            }
          },
          '& button': {
            background: '#c1c1c1',
            width: '80px'
          }
        }
      }
    },
    nav: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'center'),
      border: 'none',
      cursor: 'pointer',
      outline: 'none',
      background: '#fff',
      padding: '0',
      position: 'absolute',
      top: '0',
      height: '28px',
      width: '28px',
      zIndex: '1',
      '& > svg': {
        fill: MAIN_COLOR,
        border: MAIN_BORDER,
        borderRadius: '50%',
        background: '#fff',
        fontSize: '28px',
        height: '1em',
        width: '1em'
      }
    },
    prev: {
      right: '38px'
    },
    next: {
      right: '0'
    },

    itemWrapper: {
      ...ANCHOR_DISABLED,
      padding: '0 10px',
      display: 'block'
    },
    item: {
      borderRadius: '4px',
      overflow: 'hidden',
      backgroundColor: hexToRgb('#c6cbd4', '0.1'),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      height: '300px'
    },
    image: {
      backgroundPosition: 'center',
      backgroundSize: '100%',
      height: '50%'
    },
    text: {
      fontFamily: '\'Montserrat\', sans-serif',
      color: BLACK_COLOR,
      padding: '12px 20px',
      height: '50%'
    },
    link: {
      //      Background: hexToRgb('#c6cbd4', '0.1')
    },
    title: {
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '22px',
      marginBottom: '3px',
      display: '-webkit-box',
      WebkitLineClamp: '2',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    description: {
      extend: 'title',
      fontSize: '13px',
      fontWeight: 'normal',
      color: hexToRgb(BLACK_COLOR, '0.7'),
      lineHeight: '21px',
      overflow: 'hidden',
      WebkitLineClamp: '3'
    }
  })
)

const NewsFeed = props => {
  const { classes, data } = props
  const sliderRef = useRef(null)

  const newsList = _.get(data, 'data')
  const newsLoading = _.get(data, 'loading')
  const newsCount = newsList.length
  const maxSlidesCount = 3
  const showButtons = newsCount > maxSlidesCount

  const sliderConfig = {
    slidesToShow: newsCount > maxSlidesCount ? maxSlidesCount : newsCount,
    dots: false
  }

  if (fp.isEmpty(newsList) && !newsLoading) {
    return null
  }

  return (
    <div className={classes.wrapper}>
      <Title text={<T>main_compilation</T>}/>
      {showButtons &&
      <button className={classNames(classes.nav, classes.prev)} onClick={() => {
        const slider = _.get(sliderRef, 'current.innerSlider')
        return slider.slickPrev()
      }}><ChevronLeft/></button>}
      <Carousel
        ref={sliderRef}
        className={classes.carousel}
        {...sliderConfig}>
        {_.map(newsList, item => {
          const id = _.get(item, 'id')
          const title = _.get(item, 'title')
          const description = _.get(item, 'description')
          const image = _.get(item, 'photo.file')
          const link = _.get(item, 'link')
          return (
            <Link to={sprintf(ARTICLES_ITEM_URL, id)} key={id} className={classes.itemWrapper}>
              <div className={classes.item}>
                <div className={classes.image} style={{ backgroundImage: image ? `url(${image}` : '' }} alt="image"/>
                <div className={classNames(classes.text, { [classes.link]: link })}>
                  <div className={classes.title}>{title}</div>
                  <div className={classes.description}>{description}</div>
                </div>
              </div>
            </Link>
          )
        })}
      </Carousel>
      {showButtons &&
      <button className={classNames(classes.nav, classes.next)} onClick={() => {
        const slider = _.get(sliderRef, 'current.innerSlider')
        return slider.slickNext()
      }}><ChevronRight/></button>}
      <MoreButton
        onClick={null}
        link={ARTICLES_URL}
        text={'button_more_news'}
      />
    </div>
  )
}

NewsFeed.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object.isRequired
}

export default enhance(NewsFeed)
