import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { crossBrowserify } from 'constants/styles'
import hexToRgb from 'helpers/hexToRgb'
import Discount from 'icons/Discount'
import T from 'components/T'

const withStyles = injectSheet({
  discountWrap: {
    position: 'relative',
    '& $discountPop': {
      whiteSpace: 'nowrap'
    },
    '&:hover $discountPop': {
      opacity: '1',
      visibility: 'visible'
    },
    '& > svg': {
      color: '#8798AD'
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
    padding: '15px 30px',
    zIndex: '5'
  },
  discTitle: {
    color: hexToRgb('#282D32', '0.85'),
    fontWeight: '600',
    lineHeight: '18px'
  }
})

const ServiceDiscount = props => {
  const { classes, discount } = props

  if (discount) {
    return (
      <div className={classes.discountWrap}>
        <Discount/>
        <div className={classes.discountPop}>
          <div className={classes.discTitle}>
            <T>serv_discount</T> {discount}%
          </div>
        </div>
      </div>
    )
  }
  return null
}

ServiceDiscount.propTypes = {
  classes: PropTypes.object,
  discount: PropTypes.number
}

export default withStyles(ServiceDiscount)
