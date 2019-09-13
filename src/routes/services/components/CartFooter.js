import fp from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import numberFormat from 'helpers/numberFormat'
import { Button, YELLOW } from 'components/Button'
import hexToRgb from 'helpers/hexToRgb'
import getDiscountPrice from 'helpers/getDiscountPrice'
import T from 'components/T'

const borderStyle = `1px solid ${hexToRgb('#DFE1E7', '0.6')}`
const borderStyleGlobal = `1px solid ${hexToRgb('#fff', '0.2')}`
const withStyles = injectSheet({
  cartFooterGlobal: {
    '& $cartTotal': {
      borderBottom: borderStyleGlobal,
      color: 'white'
    },
    '& $cartClear': {
      color: 'white'
    }
  },
  cartTotal: {
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '18px',
    color: 'black',
    padding: '14px 30px',
    borderBottom: borderStyle
  },
  payment: {
    padding: '20px 58px'
  },
  cartClear: {
    fontSize: '13px',
    lineHeight: '16px',
    color: '#8798AD',
    marginTop: '8px',
    textAlign: 'center',
    cursor: 'pointer'
  }
})

const CartFooter = props => {
  const {
    classes,
    isGlobal,
    data,
    userEmail,
    loading,
    onOrderCreate,
    onClearCart
  } = props

  const totalPrice = fp.sumBy(item => {
    const amount = fp.get('amount', item)
    const discount = fp.get('discountPercentage', item)
    const price = fp.toNumber(fp.get('defaultPrice', item))
    return getDiscountPrice(price, discount) * amount
  }, data)

  return (
    <div className={isGlobal ? classes.cartFooterGlobal : ''}>
      <div className={classes.cartTotal}><T>serv_total</T>:  {numberFormat(totalPrice, 'UZS')}</div>
      <div className={classes.payment}>
        <Button
          text={'serv_pay'}
          loading={loading}
          rounded={true}
          fullWidth={true}
          color={isGlobal ? YELLOW : ''}
          onClick={() => onOrderCreate(data)}
        />
        <div className={classes.cartClear} onClick={() => onClearCart(true, userEmail)}>
          <T>serv_clear_cart</T>
        </div>
      </div>
    </div>
  )
}

CartFooter.propTypes = {
  classes: PropTypes.object,
  isGlobal: PropTypes.bool,
  userEmail: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onOrderCreate: PropTypes.func.isRequired,
  onClearCart: PropTypes.func.isRequired
}

CartFooter.defaultProps = {
  isGlobal: false
}

export default withStyles(CartFooter)
