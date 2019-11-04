import {
  crossBrowserify,
  fallbacksStyle,
  PRIMARY_COLOR,
  ANCHOR_DISABLED
} from 'constants/styles'
import { SERVICE_ITEM_URL } from 'constants/routes'
import fp from 'lodash/fp'
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import sprintf from 'sprintf'
import hexToRgb from 'helpers/hexToRgb'
import numberFormat from 'helpers/numberFormat'
import ChevronLeft from 'icons/CaruselLeft'
import ChevronRight from 'icons/CaruselRight'
import Diamond from 'icons/Diamond'
import Carousel from 'antd/lib/carousel'
import Link from 'components/Link'
import T from 'components/T'

const enhance = compose(
  injectSheet({
    wrapper: {
      position: 'relative',
      padding: '0 52px'
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
      ...crossBrowserify('borderRadius', '50%'),
      ...crossBrowserify('transition', 'all 300ms'),
      ...crossBrowserify('transform', 'translateY(-50%)'),
      background: hexToRgb('#fff', '0.42'),
      border: 'none',
      cursor: 'pointer',
      outline: 'none',
      padding: '0',
      position: 'absolute',
      top: '50%',
      height: '36px',
      width: '36px',
      zIndex: '1',
      '&:hover': {
        background: hexToRgb('#fff', '0.84')
      },
      '& > svg': {
        fill: '#697A8F',
        fontSize: '20px'
      }
    },
    prev: {
      left: '0'

    },
    next: {
      right: '0'
    },

    itemWrapper: {
      ...ANCHOR_DISABLED,
      padding: '15px 10px'
    },
    item: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'space-between'),
      ...crossBrowserify('boxShadow', '5px 5px 9px rgba(72, 72, 72, 0.08)'),
      ...crossBrowserify('borderRadius', '12px'),
      background: 'white',
      height: '125px',
      overflow: 'hidden',
      padding: '20px',
      position: 'relative'
    },
    diamond: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center'),
      ...crossBrowserify('justifyContent', 'center'),
      ...crossBrowserify('borderRadius', '50%'),
      background: '#EEF1F6',
      height: '66px',
      width: '66px'
    },
    content: {
      ...crossBrowserify('alignSelf', 'baseline'),
      fontFamily: '\'Montserrat\', sans-serif',
      color: '#282D32',
      paddingRight: '10px'
    },
    title: {
      fontSize: '16px',
      fontWeight: '500',
      marginTop: '5px'
    },
    tag: {
      background: '#5E77FF',
      borderRadius: '10px',
      color: 'white',
      fontSize: '13px',
      fontWeight: '500',
      padding: '0 8px',
      lineHeight: '20px',
      width: 'max-content'
    },
    vacancy: {
      background: '#F46090'
    },
    database: {
      background: '#2BC48C'
    },
    balance: {
      color: 'black',
      background: '#FFD367'
    },
    price: {
      fontSize: '14px',
      fontWeight: '500',
      paddingTop: '8px',
      marginTop: '8px',
      position: 'relative',
      '&:after': {
        background: '#9DABBC',
        content: '""',
        height: '1px',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '75px'
      }
    }
  })
)

const data = [
  {
    type: 'employer_service',
    title: 'Продвижение вакансии',
    discount: 15,
    price: 200000
  },
  {
    type: 'database_access',
    title: 'Доступ к базе',
    price: 350000
  },
  {
    type: 'vip_packet',
    title: 'VIP - пакеты',
    price: 800000
  },
  {
    type: 'payment',
    title: 'Пополнение счета'
  }
]

const sliderConfig = {
  slidesToShow: 2,
  dots: false
}

const CarouselContainer = props => {
  const { classes, prices } = props
  const sliderRef = useRef(null)

  const getMinPrice = serviceType => {
    return fp.flow(
      fp.find({ actionType: serviceType }),
      fp.get('minPrice')
    )(prices)
  }

  const getTagTitle = serviceType => {
    switch (serviceType) {
    case 'employer_service': return 'Вакансия'
    case 'vip_packet': return 'VIP услуги'
    case 'database_access': return 'База MyJob'
    case 'payment': return 'Баланс'
    default: return null
    }
  }

  const onClickNav = navigate => {
    const slider = fp.get('current.innerSlider', sliderRef)
    if (navigate === 'prev') slider.slickPrev()
    if (navigate === 'next') slider.slickNext()
  }

  return (
    <div className={classes.wrapper}>
      <button
        className={classNames(classes.nav, classes.prev)}
        onClick={() => onClickNav('prev')}
      >
        <ChevronLeft />
      </button>
      <Carousel
        ref={sliderRef}
        className={classes.carousel}
        {...sliderConfig}
      >
        {fp.map(item => {
          const type = fp.get('type', item)
          const title = fp.get('title', item)
          const price = getMinPrice(type)
          const discount = fp.get('discount', item)
          return (
            <Link key={type} to={sprintf(SERVICE_ITEM_URL, type)} className={classes.itemWrapper}>
              <div className={classes.item}>
                <div className={classes.content}>
                  <div className={classNames(classes.tag, {
                    [classes.vacancy]: type === 'employer_service',
                    [classes.database]: type === 'database_access',
                    [classes.balance]: type === 'payment'
                  })}
                  >
                    {getTagTitle(type, discount)}
                  </div>
                  <div className={classes.title}>{title}</div>
                  {price && <div className={classes.price}>
                    <T>main_from</T> {numberFormat(price, 'UZS')}
                  </div>}
                </div>
                <div className={classes.diamond}>
                  <Diamond />
                </div>
              </div>
            </Link>
          )
        }, data)}
      </Carousel>
      <button
        className={classNames(classes.nav, classes.next)}
        onClick={() => onClickNav('next')}
      >
        <ChevronRight />
      </button>
    </div>
  )
}

CarouselContainer.propTypes = {
  classes: PropTypes.object,
  prices: PropTypes.array.isRequired
}

export default enhance(CarouselContainer)
