import React, { useState, useEffect, useRef } from 'react'
import fp from 'lodash/fp'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import {
  crossBrowserify,
  fallbacksStyle,
  MAIN_COLOR
} from 'constants/styles'
import {
  removeCartItemAction,
  clearCartAction
} from 'routes/action-common/cart'
import {
  orderCreateAction,
  orderMakePaymentAction,
  onOrderCreateAction
} from 'routes/action-common/order'
import CartIcon from 'icons/Cart'
import CartItems from 'routes/services/components/CartItems'
import CartFooter from 'routes/services/components/CartFooter'
import Container from 'components/Container'
import T from 'components/T'

const getUserEmail = (userData) => {
  return fp.get('username', userData) || fp.get('email', userData)
}

const mapStateToProps = (state, { userData }) => {
  const userEmail = getUserEmail(userData)
  return {
    cartList: fp.get(['cart', 'data', userEmail], state)
  }
}

const withStyles = compose(
  connect(mapStateToProps, {
    clearCartAction,
    removeCartItemAction,
    orderCreateAction,
    orderMakePaymentAction
  }),
  withHandlers({
    onOrderCreate: ({ cartList, ...props }) => () => {
      return onOrderCreateAction(props, cartList)
    }
  }),
  injectSheet({
    container: {
      position: 'fixed',
      top: '155px',
      left: '0',
      right: '0',
      zIndex: '100'
    },
    cartWrapper: {
      ...fallbacksStyle('display', 'inline-flex'),
      ...crossBrowserify('alignItems', 'center'),
      // ...crossBrowserify('justify-content', 'center'),
      ...crossBrowserify('borderRadius', '50px'),
      background: MAIN_COLOR,
      color: '#fff',
      cursor: 'pointer',
      fontWeight: '500',
      lineHeight: '18px',
      height: '50px',
      padding: '14px 25px',
      position: 'absolute',
      right: '30px',
      zIndex: '10',
      '& svg': {
        fontSize: '21px',
        marginRight: '4px'
      },
      '& > svg, & > span': {
        pointerEvents: 'none'
      }
    },
    counter: {
      ...crossBrowserify('borderRadius', '50px'),
      background: '#F46090',
      fontSize: '13px',
      padding: '0 4px',
      marginLeft: '8px',
      minWidth: '18px',
      textAlign: 'center'
    },
    dropdown: {
      ...crossBrowserify('borderRadius', '4px'),
      ...crossBrowserify('transition', 'all 250ms'),
      background: MAIN_COLOR,
      color: '#fff',
      position: 'absolute',
      right: '30px',
      top: '65px',
      opacity: '0',
      visibility: 'hidden',
      width: '275px'
    },
    dropdownOpen: {
      opacity: '1',
      visibility: 'visible'
    }
  })
)

const Cart = props => {
  const { classes, cartList, userData, isEmployer, ...otherProps } = props

  const [open, setOpen] = useState(false)
  const cartRef = useRef(null)
  const dropdownRef = useRef(null)

  const emptyCart = fp.isEmpty(cartList)
  const servicesCount = fp.get('length', cartList)
  const userEmail = getUserEmail(userData)

  const openDropdown = () => {
    if (!open) setOpen(true)
  }
  const closeDropdown = () => {
    if (open) setOpen(false)
  }

  const handleClick = event => {
    if (!emptyCart && isEmployer) {
      const isOutsideCart = !cartRef.current.contains(event.target)
      const isOutsideDropdown = !dropdownRef.current.contains(event.target)
      if (isOutsideCart && isOutsideDropdown) closeDropdown()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })

  useEffect(() => {
    if (emptyCart) {
      setOpen(false)
    }
  }, [cartList])

  if (emptyCart || !isEmployer) return null

  return (
    <Container className={classes.container}>
      <div ref={cartRef} className={classes.cartWrapper} onClick={openDropdown}>
        <CartIcon/>
        <span><T>serv_cart</T></span>
        <span className={classes.counter}>{servicesCount}</span>
      </div>
      <div ref={dropdownRef} className={classNames(classes.dropdown, {
        [classes.dropdownOpen]: open
      })}>
        <CartItems
          isGlobal={true}
          data={cartList}
          userEmail={userEmail}
          onRemoveItem={otherProps.removeCartItemAction}
        />
        <CartFooter
          isGlobal={true}
          data={cartList}
          userEmail={userEmail}
          onOrderCreate={otherProps.onOrderCreate}
          onClearCart={otherProps.clearCartAction}
        />
      </div>
    </Container>
  )
}

Cart.propTypes = {
  classes: PropTypes.object,
  userData: PropTypes.object,
  cartList: PropTypes.array,
  isEmployer: PropTypes.bool
}

export default withStyles(Cart)
