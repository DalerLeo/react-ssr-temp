import fp from 'lodash/fp'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import {
  crossBrowserify,
  fallbacksStyle
} from 'constants/styles'
import numberFormat from 'helpers/numberFormat'
import Spinner from 'icons/Spinner'
import CartIcon from 'icons/Cart'
import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down'
import T from 'components/T'
import CartItems from './CartItems'
import CartFooter from './CartFooter'

const withStyles = compose(
  connect(state => {
    return {
      userData: fp.get(['user', 'data'], state),
      userDataLoading: fp.get(['user', 'loading'], state)
    }
  }),
  injectSheet({
    wrapper: {
      minWidth: '300px',
      width: '300px'
    },
    balance: {
      ...fallbacksStyle('display', 'inline-flex'),
      ...crossBrowserify('alignItems', 'center'),
      color: '#71839B',
      border: '1px solid #DFE1E7',
      borderRadius: '6px',
      lineHeight: '20px',
      padding: '14px 12px',
      minWidth: '200px',
      whiteSpace: 'nowrap',
      '& span': {
        color: 'black',
        fontSize: '15px',
        fontWeight: '500',
        marginLeft: '5px'
      }
    },
    loader: {
      fontSize: '20px',
      marginLeft: '5px'
    },
    ownTitle: {
      fontWeight: '500',
      fontSize: '16px',
      margin: '12px 0 5px',
      lindHeight: '19px'
    },
    own: {
      fontWeight: '500',
      fontSize: '14px',
      color: '#8798AD'
    },
    cartWrap: {
      width: '100%',
      background: '#FBFBFD',
      border: '1px solid #F3F3F6',
      boxShadow: '0px 5px 12px rgba(0, 0, 0, 0.0443558)',
      borderRadius: '4px',
      marginTop: '12px'
    },
    cartHead: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('justifyContent', 'space-between'),
      ...crossBrowserify('alignItems', 'center'),
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      padding: '17px 20px 20px 30px',
      '& svg': {
        color: '#8798AD',
        fontSize: '20px'
      }
    },
    cartHeadTitle: {
      ...fallbacksStyle('display', 'flex'),
      ...crossBrowserify('alignItems', 'center')
    },
    cartIcon: {
      marginRight: '5px'
    },
    headCount: {
      fontWeight: 'bold',
      fontSize: '15px',
      color: '#F46090',
      marginLeft: '5px'
    },
    arrowIcon: {
      ...crossBrowserify('transition', 'all 300ms')
    },
    arrowIconExpanded: {
      ...crossBrowserify('transform', 'rotate(180deg)')
    }
  })
)

const Cart = props => {
  const {
    data,
    classes,
    userData,
    userEmail,
    userDataLoading,
    onRemoveItem,
    onClearCart,
    onOrderCreate,
    createLoading
  } = props

  const [isOpen, setIsOpen] = useState(true)

  const list = fp.get(userEmail, data)
  const hasItems = !fp.isEmpty(list)
  const balance = numberFormat(fp.get('balance', userData), 'UZS')
  const cartItemsCount = hasItems ? fp.get('length', list) : 'Ваша корзина пуста'

  const toggleCart = () => {
    if (hasItems) return setIsOpen(!isOpen)
    return null
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.balance}>
        <T>main_balance</T>:
        <span>{balance}</span>
        {userDataLoading && <Spinner className={classes.loader}/>}
      </div>
      {false && <div>
        <div className={classes.ownTitle}><T>serv_in_stock</T>:</div>
        <div className={classes.own}>
          • 5 стандартных вакансий
        </div>
      </div>}

      <div className={classes.cartWrap}>
        <div className={classes.cartHead} onClick={toggleCart}>
          <span className={classes.cartHeadTitle}>
            <CartIcon className={classes.cartIcon}/>
            {hasItems && <span><T>serv_cart</T></span>}
            <span className={classes.headCount}>{cartItemsCount}</span>
          </span>
          {hasItems && <ArrowDown className={classNames(classes.arrowIcon, {
            [classes.arrowIconExpanded]: isOpen
          })}/>}
        </div>
        {isOpen && hasItems &&
        <React.Fragment>
          <CartItems
            data={list}
            userEmail={userEmail}
            onRemoveItem={onRemoveItem}
          />
          <CartFooter
            data={list}
            userEmail={userEmail}
            loading={createLoading}
            onClearCart={onClearCart}
            onOrderCreate={onOrderCreate}
          />
        </React.Fragment>}
      </div>
    </div>
  )
}

Cart.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object.isRequired,
  userEmail: PropTypes.string.isRequired,
  userData: PropTypes.object,
  userDataLoading: PropTypes.bool,
  onRemoveItem: PropTypes.func.isRequired,
  onClearCart: PropTypes.func.isRequired,
  onOrderCreate: PropTypes.func.isRequired,
  createLoading: PropTypes.bool.isRequired
}

export default withStyles(Cart)
