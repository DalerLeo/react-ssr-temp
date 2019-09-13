import React from 'react'
import fp from 'lodash/fp'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { crossBrowserify, fallbacksStyle, ONE, YELLOW_COLOR } from 'constants/styles'
import numberFormat from 'helpers/numberFormat'
import Diamond from 'icons/Diamond'
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
    minHeight: '400px',
    padding: '30px 38px',
    position: 'relative'
  },
  cardPremium: {
    border: `2px solid ${YELLOW_COLOR}`
  },
  discount: {
    position: 'absolute',
    top: '27px',
    right: '38px'
  },
  cardTitle: {
    ...fallbacksStyle('display', 'flex'),
    fontWeight: 'bold',
    fontSize: '15px',
    textTransform: 'uppercase',
    color: '#8798AD',
    paddingBottom: '14px',
    borderBottom: '1px solid #EFF1F2',
    marginBottom: '20px'
  },
  price: {
    borderTop: '1px solid #EFF1F2',
    color: '#343434',
    fontSize: '28px',
    fontWeight: '800',
    marginTop: '10px',
    paddingTop: '8px',
    wordSpacing: '-2px'
  },
  diamond: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    ...crossBrowserify('justifyContent', 'center'),
    background: '#EEF1F6',
    borderRadius: '50%',
    marginRight: '16px',
    padding: '20px 18px',
    height: '73px',
    width: '73px'
  },
  title: {
    ...crossBrowserify('flexGrow', '1')
  },
  description: {
    color: '#8798AD',
    lineHeight: '22px',
    marginBottom: '30px',
    '& ul': {
      paddingLeft: '20px',
      margin: '0'
    }
  }
})

const VipCard = props => {
  const { classes, item, cartList, userEmail, onAddCart, onRemoveCartItem } = props

  const servicesInCart = fp.map(fp.get('id'), cartList)

  const price = fp.get('defaultPrice', item)
  const id = fp.get('id', item)
  const code = fp.get('code', item)
  const discount = fp.get('discountPercentage', item)
  const isVIP12 = code === 'VP2'
  const name = fp.get('name', item)
  const description = fp.get('description', item)
  const serviceInCart = fp.includes(id, servicesInCart)

  return (
    <div className={classNames(classes.card, {
      [classes.cardPremium]: isVIP12
    })}>
      <div className={classes.discount}>
        <ServiceDiscount discount={discount} />
      </div>
      <div>
        <div className={classes.cardTitle}>
          <div className={classes.diamond}><Diamond/></div>
          <div className={classes.title}>
            <div>{name}</div>
            <div className={classes.price}>{numberFormat(price, 'UZS')}</div>
          </div>
        </div>
        <div
          className={classes.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <Button
        rounded
        type={'medium'}
        color={YELLOW}
        fullWidth={true}
        text={serviceInCart ? 'serv_remove_cart' : 'serv_add_cart'}
        onClick={() => serviceInCart ? onRemoveCartItem(id) : onAddCart(item, ONE, userEmail)}
      />
    </div>
  )
}

VipCard.propTypes = {
  classes: PropTypes.object,
  item: PropTypes.object.isRequired,
  userEmail: PropTypes.string.isRequired,
  cartList: PropTypes.array.isRequired,
  onAddCart: PropTypes.func.isRequired,
  onRemoveCartItem: PropTypes.func.isRequired
}

export default withStyles(VipCard)
