import fpGet from 'lodash/fp/get'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import sprintf from 'sprintf'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { crossBrowserify, fallbacksStyle } from 'constants/styles'
import { SERVICE_ITEM_URL } from 'constants/routes'
import withHistory from 'helpers/withHistory'
import { getServicesMinPrices } from 'routes/services/actions'
import { Button, TRANSPARENT } from 'components/Button'
import T from 'components/T'
import Carousel from './Carousel'
import { getStateData } from 'helpers/get'

const mapStateToProps = state => ({
  ...getStateData('service.minPrices', 'prices', state, false)
})

const withStyles = compose(
  withHistory,
  connect(mapStateToProps, {
    getServicesMinPrices
  }),
  injectSheet({
    servicesWrap: {
      background: '#FFD367',
      boxShadow: '0px 5px 12px rgba(0, 0, 0, 0.0443558)',
      borderRadius: '4px',
      padding: '30px',
      paddingRight: '20px',
      marginBottom: '25px',
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center')
    },
    onlyCarousel: {
      '& $servicesInfo': {
        display: 'none'
      },
      '& $carouselWrap': {
        width: '100%'
      }
    },
    serviceTitle: {
      fontSize: '28px',
      lineHeight: '34px',
      fontWeight: '600'
    },
    servicesInfo: {
      width: '320px'
    },
    carouselWrap: {
      width: 'calc(100% - 320px)'
    },
    allServices: {
      marginTop: '20px'
    }
  })
)

const ServicesCarousel = props => {
  const {
    classes,
    history,
    onlyCarousel,
    pricesList,
    ...restProps
  } = props

  const pushToServices = () => history.push(sprintf(SERVICE_ITEM_URL, 'vacancy'))

  useEffect(() => {
    restProps.getServicesMinPrices()
  }, [])

  return (
    <div className={classNames(classes.servicesWrap, {
      [classes.onlyCarousel]: onlyCarousel
    })}>
      <div className={classes.servicesInfo}>
        <div className={classes.serviceTitle}><T>main_mj_serv</T></div>
        <div><T>main_mj_serv_description</T></div>
        <Button
          className={classes.allServices}
          text={'main_mj_serv_all'}
          color={TRANSPARENT}
          onClick={pushToServices}
        />
      </div>
      <div className={classes.carouselWrap}>
        <Carousel
          prices={fpGet('data', pricesList)}
        />
      </div>
    </div>
  )
}

ServicesCarousel.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  pricesList: PropTypes.object,
  onlyCarousel: PropTypes.bool
}

ServicesCarousel.defaultProps = {
  onlyCarousel: false
}

export default withStyles(ServicesCarousel)
