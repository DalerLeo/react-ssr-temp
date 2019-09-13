import React, { useState } from 'react'
import fp from 'lodash/fp'
import loNumber from 'lodash/toNumber'
import loMap from 'lodash/map'
import loMapValues from 'lodash/mapValues'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { Field } from 'redux-form'
import { crossBrowserify, fallbacksStyle, ONE, YELLOW_COLOR } from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'
import numberFormat from 'helpers/numberFormat'
import getDiscountPrice from 'helpers/getDiscountPrice'
import T from 'components/T'
import CounterField from 'components/FormComponents/CounterField'
import { Button, YELLOW } from 'components/Button'
import ServiceDiscount from './ServiceDiscount'

const withStyles = injectSheet({
  card: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('flexDirection', 'column'),
    ...crossBrowserify('justifyContent', 'space-between'),
    background: '#FBFBFD',
    borderRadius: '4px',
    height: '100%',
    padding: '30px 38px 45px'
  },
  cardPremium: {
    border: `2px solid ${YELLOW_COLOR}`
  },
  cardTitle: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('justifyContent', 'space-between'),
    lineHeight: 'normal',
    marginBottom: '26px'
  },
  title: {
    color: '#8798AD',
    fontWeight: 'bold',
    fontSize: '15px',
    textTransform: 'uppercase'
  },
  feature: {
    lineHeight: '18px',
    color: '#8798AD',
    '&:not(:last-child)': {
      marginBottom: '15px'
    }
  },
  total: {
    paddingTop: '22px',
    borderTop: '1px solid #EFF1F2',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '19px',
    textAlign: 'right',
    marginBottom: '30px'
  },
  input: {
    ...fallbacksStyle('display', 'flex'),
    borderBottom: '1px solid #EFF1F2',
    borderTop: '1px solid #EFF1F2',
    marginBottom: '30px',
    padding: '20px 0'
  },
  price: {
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#282D32'
  },
  discount: {
    color: hexToRgb('#282D32', '0.85'),
    display: 'inline-block',
    position: 'relative',
    fontWeight: '500',
    borderBottom: 'dashed 1px',
    borderColor: hexToRgb('#282D32', '0.85'),
    '&:hover $discountPop': {
      opacity: '1',
      visibility: 'visible'
    }
  },
  discountPop: {
    ...crossBrowserify('borderRadius', '4px'),
    ...crossBrowserify('transition', 'all 300ms'),
    ...crossBrowserify('boxShadow', '0px 14px 30px rgba(0, 0, 0, 0.14)'),
    background: '#fff',
    opacity: '0',
    visibility: 'hidden',
    overflow: 'hidden',
    position: 'absolute',
    top: 'calc(100% + 14px)',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '17px 52px 17px 30px',
    zIndex: '5'
  },
  discTitle: {
    color: hexToRgb('#282D32', '0.85'),
    fontWeight: '600',
    lineHeight: '18px'
  },
  discDesc: {
    minWidth: '185px',
    fontSize: '13px',
    lineHeight: '18px',
    color: '#969BA8',
    marginTop: '5px',
    paddingBottom: '13px',
    marginBottom: '17px',
    borderBottom: '1px solid #EFF1F2'
  },
  discItems: {
    fontWeight: 'normal',
    marginBottom: '5px',
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('justifyContent', 'space-between')
  },
  discTypes: {
    extend: 'discItems',
    fontWeight: '500'
  },
  button: {
    marginTop: '20px'
  }
})

const VacancyCard = props => {
  const {
    classes,
    userEmail,
    item,
    features,
    discounts,
    onAddCart
  } = props

  const id = fp.get('id', item)
  const code = fp.get('code', item)
  const isPremium = code === 'ES5'
  const name = fp.get('name', item)
  const price = fp.get('defaultPrice', item)
  const bonuses = fp.flow(
    fp.get('bonuses'),
    fp.map(obj => {
      return loMapValues(obj, value => fp.toNumber(value))
    })
  )(discounts)
  const discountPercentage = fp.get('discountPercentage', item)
  const priceNumber = loNumber(price)

  const [count, setCount] = useState(ONE)
  const [servicePrice, setServicePrice] = useState(priceNumber)

  const onChangeCount = serviceCount => {
    setCount(serviceCount)
    const currentBonusPrice = fp.flow(
      fp.find(obj => {
        const from = fp.get('fromPrice', obj)
        const to = fp.get('toPrice', obj)
        return (serviceCount >= from) && (serviceCount <= to)
      }),
      fp.get('bonus')
    )(bonuses)
    if (currentBonusPrice) setServicePrice(currentBonusPrice)
    else setServicePrice(priceNumber)
  }

  const totalPrice = count * getDiscountPrice(servicePrice, discountPercentage)

  return (
    <div className={classNames(classes.card, {
      [classes.cardPremium]: isPremium
    })}>
      <div>
        <div className={classes.cardTitle}>
          <div className={classes.title}>{name}</div>
          <ServiceDiscount discount={discountPercentage}/>
        </div>
        <div className={classes.input}>
          <Field
            name={`vacancyCount.${id}`}
            component={CounterField}
            onChange={(event, value) => onChangeCount(value)}
          />
          <div style={{ marginLeft: '15px' }}>
            <div className={classes.price}>{numberFormat(totalPrice, 'UZS')}</div>
            <div className={classes.discount}>
              <T>serv_discount</T>
              <div className={classes.discountPop}>
                <div className={classes.discTitle}><T>serv_discounts</T></div>
                <div className={classes.discDesc}><T>serv_discounts_desc</T></div>
                <div className={classes.discItems}>
                  <span><T>serv_discounts_count</T></span>
                  <span><T>serv_discounts_price</T></span>
                </div>
                {loMap(bonuses, (obj, key) => {
                  const fromCount = fp.get('fromPrice', obj)
                  const toCount = fp.get('toPrice', obj)
                  const settingPrice = fp.get('bonus', obj)
                  return (
                    <div key={key} className={classes.discTypes}>
                      <span>{fromCount} - {toCount}шт.</span> <span>{numberFormat(settingPrice, 'UZS')}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div>
          {loMap(features, (feature, index) => {
            return (
              <div key={index} className={classes.feature}>{feature}</div>
            )
          })}
        </div>
      </div>
      <Button
        onClick={() => onAddCart({ ...item, defaultPrice: servicePrice }, count, userEmail)}
        text={'serv_add_cart'}
        className={classes.button}
        type={'medium'}
        color={YELLOW}
        fullWidth={true}
        rounded
      />
    </div>
  )
}

VacancyCard.propTypes = {
  classes: PropTypes.object,
  userEmail: PropTypes.string,
  discounts: PropTypes.object,
  item: PropTypes.object.isRequired,
  features: PropTypes.array,
  onAddCart: PropTypes.func.isRequired
}

export default withStyles(VacancyCard)
