import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import fp from 'lodash/fp'
import { crossBrowserify, fallbacksStyle, ONE } from 'constants/styles'
import { serviceDurationFormat } from 'constants/services'
import { getTranslate } from 'helpers/translate'
import numberFormat from 'helpers/numberFormat'
import hexToRgb from 'helpers/hexToRgb'
import withQuotes from 'helpers/withQuotes'
import RemoveIcon from 'react-icons/lib/md/close'
import T from 'components/T'
import TW from 'components/TW'

const borderStyle = `1px solid ${hexToRgb('#DFE1E7', '0.6')}`
const borderStyleGlobal = `1px solid ${hexToRgb('#fff', '0.2')}`

const withStyles = injectSheet({
  cartItems: {
    maxHeight: '400px',
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar-thumb': {
      background: hexToRgb('#fff', '0.5')
    }
  },
  cartItemsGlobal: {
    '& $spec, & $itemAmount, & $itemPeriod, & $discount': {
      color: hexToRgb('#fff', '0.6')
    },
    '& $cartItem': {
      borderBottom: borderStyleGlobal,
      '&:first-child': {
        borderTop: 'none'
      },
      '&:nth-child(even)': {
        background: hexToRgb('#f6f6f6', '0.18')
      }
    },
    '& $itemRemove': {
      border: borderStyleGlobal,
      '& svg': {
        color: 'white'
      }
    }
  },
  cartItem: {
    borderBottom: borderStyle,
    padding: '14px 22px 12px 30px ',
    position: 'relative',
    '&:first-child': {
      borderTop: borderStyle
    },
    '&:hover $itemRemove': {
      opacity: '0.6'
    }
  },
  itemTitle: {
    fontWeight: '500',
    fontSize: '13px',
    lineHeight: '20px',
    paddingRight: '25px'
  },
  spec: {
    color: '#8798AD'
  },
  itemAmount: {
    extend: 'spec',
    marginLeft: '5px'
  },
  itemPeriod: {
    fontStyle: 'italic',
    fontSize: '12px',
    lineHeight: '17px',
    color: '#9197A4',
    margin: '5px 0 6px'
  },
  itemPrice: {
    fontSize: '12px',
    lineHeight: '21px'
  },
  discount: {
    color: '#8798AD',
    marginLeft: '5px'
  },
  itemRemove: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    ...crossBrowserify('justifyContent', 'center'),
    ...crossBrowserify('borderRadius', '4px'),
    ...crossBrowserify('transition', 'all 300ms'),
    ...crossBrowserify('transform', 'translateY(-50%)'),
    border: '1px solid #DFE1E7',
    cursor: 'pointer',
    height: '26px',
    opacity: '0',
    position: 'absolute',
    top: '50%',
    right: '22px',
    width: '26px',
    '& svg': {
      color: '#8798AD',
      fontSize: '16px'
    },
    '&:hover': { opacity: '1 !important' }
  }
})

const CartItems = props => {
  const { classes, isGlobal, userEmail, data, onRemoveItem } = props

  return (
    <TW>
      {lang => (
        <div className={classNames(classes.cartItems, {
          [classes.cartItemsGlobal]: isGlobal
        })}>
          {fp.map(item => {
            const id = fp.get('id', item)
            const name = fp.get('name', item)
            const amount = fp.get('amount', item)
            const activeDays = fp.get('activeDays', item)
            const price = fp.toNumber(fp.get('defaultPrice', item))
            const discount = fp.get('discountPercentage', item)
            const specialities = fp.get('specialities', item)
            const totalPrice = price * amount
            const period = fp.get(activeDays, serviceDurationFormat)
            return (
              <div className={classes.cartItem} key={id}>
                <div className={classes.itemTitle}>
                  {name}
                  {specialities && <div className={classes.spec}>
                    {fp.flow(
                      fp.map(spec => getTranslate(spec, lang)),
                      fp.map(spec => withQuotes(spec)),
                      fp.join(', ')
                    )(specialities)}
                  </div>}
                  {(amount > ONE) && <span className={classes.itemAmount}>{`(${amount})`}</span>}
                </div>
                {period && <div className={classes.itemPeriod}>{period}</div>}
                <div className={classes.itemPrice}>
                  {numberFormat(totalPrice, 'UZS')}
                  {discount &&
                  <span className={classes.discount}>
                    (<T>serv_discount</T> {discount}%)
                  </span>}
                </div>

                <div className={classes.itemRemove} onClick={() => onRemoveItem(id, userEmail)}>
                  <RemoveIcon/>
                </div>
              </div>
            )
          }, data)}
        </div>
      )}
    </TW>
  )
}

CartItems.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.array.isRequired,
  userEmail: PropTypes.string.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  isGlobal: PropTypes.bool
}

CartItems.defaultProps = {
  isGlobal: false
}

export default withStyles(CartItems)
