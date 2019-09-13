import React from 'react'
import PropTypes from 'prop-types'
import loMap from 'lodash/map'
import fp from 'lodash/fp'
import moment from 'moment'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { crossBrowserify, fallbacksStyle } from 'constants/styles'
import { hexToRgb } from 'helpers'
import numberFormat from 'helpers/numberFormat'
import { getTranslate } from 'helpers/translate'
import Diamond from 'icons/Diamond'
import Dialog from 'components/Dialog'
import T from 'components/T'
import TW from 'components/TW'
import { Button, APPEAL, REGRET } from 'components/Button'

const withStyles = injectSheet({
  container: {
    padding: '40px 50px 20px'
  },
  header: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    paddingBottom: '30px',
    position: 'relative'
  },
  title: {
    color: 'black',
    fontSize: '20px',
    fontWeight: '500'
  },
  orderDate: {
    color: '#7B8999',
    fontSize: '20px',
    marginLeft: '30px'
  },
  status: {
    color: 'black',
    position: 'absolute',
    top: '3px',
    right: '28px',
    whiteSpace: 'nowrap',
    '& > span:first-child': {
      marginRight: '5px'
    }
  },
  orderList: {
    paddingRight: '28px',
    maxHeight: '360px',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  order: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    ...crossBrowserify('justifyContent', 'space-between'),
    borderBottomStyle: 'solid',
    borderColor: '#EEF0F2',
    borderWidth: '1px',
    padding: '18px 0',
    maxHeight: '90px',
    '&:first-child': {
      borderTopStyle: 'solid'
    }
  },
  servicePrice: {
    color: 'black',
    fontWeight: '500'
  },
  orderDetails: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center')
  },
  diamond: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    ...crossBrowserify('justifyContent', 'center'),
    ...crossBrowserify('borderRadius', '50%'),
    background: '#EEF1F6',
    marginRight: '12px',
    height: '54px',
    width: '54px'
  },
  serviceName: {
    color: 'black',
    fontWeight: '500',
    lineHeight: 'normal'
  },
  vacancyName: {
    color: hexToRgb('#000', '0.5'),
    fontSize: '13px',
    marginTop: '5px'
  },

  footer: {
    background: '#EEF0F2',
    padding: '28px 50px 32px'
  },
  prices: {
    ...fallbacksStyle('display', 'flex'),
    ...crossBrowserify('alignItems', 'center'),
    ...crossBrowserify('justifyContent', 'space-between'),
    marginBottom: '30px'
  },
  summary: {
    color: 'black',
    fontSize: '16px',
    fontWeight: '500'
  },
  buttons: {
    textAlign: 'right'
  },
  button: {
    minWidth: '180px',
    '&:not(:first-child)': {
      marginLeft: '20px'
    }
  }
})

const OrderDetails = props => {
  const {
    open,
    handleClose,
    classes,
    detailData,
    statusText,
    getStatusClassNames,
    onRequestContract,
    contractLoading
  } = props

  const data = fp.get('data', detailData)
  const loading = fp.get('loading', detailData)

  const orderId = fp.get('id', data)
  const createdDate = moment(fp.get('createdDate', data)).format('DD MMM YYYY')
  const status = fp.get('status', data)
  const orderServices = fp.get('orderServices', data)
  const orderServicesGrouped = fp.groupBy(
    fp.get(['service', 'code']),
    orderServices
  )
  const totalPrice = fp.get('totalPrice', data)
  const totalBalance = fp.get('totalBalance', data)
  const totalPaid = totalPrice - totalBalance

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      width={900}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title}><T>emp_order_title</T>{orderId}</div>
          <div className={classes.orderDate}>{createdDate}</div>
          <div className={classes.status}>
            <span><T>emp_status_title</T>:</span>
            <span className={classNames(getStatusClassNames(status))}>
              <T>{fp.get(status, statusText)}</T>
            </span>
          </div>
        </div>
        <div className={classes.orderList}>
          {loMap(orderServicesGrouped, (services, index) => {
            const count = services.length
            const showCount = count > 1
            const price = fp.sumBy(fp.get('price'), services)
            const item = fp.head(services)
            const name = fp.get(['service', 'name'], item)
            const speciality = fp.get(['service', 'speciality'], item)
            const activeDays = fp.get(['service', 'activeDays'], item)
            return (
              <div key={index} className={classes.order}>
                <div className={classes.orderDetails}>
                  <div className={classes.diamond}>
                    <Diamond/>
                  </div>
                  <div>
                    <div className={classes.serviceName}>{name} {showCount && `(${count})`}</div>
                    {activeDays && (
                      <div className={classes.vacancyName}>
                        <T>emp_validity</T>: {activeDays}
                      </div>
                    )}
                    {speciality && (
                      <TW>
                        {lang => <div className={classes.vacancyName}>{getTranslate(speciality, lang)}</div>}
                      </TW>
                    )}
                  </div>
                </div>
                <div className={classes.servicePrice}>{numberFormat(price, 'UZS')}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={classes.footer}>
        <div className={classes.prices}>
          <div className={classes.summary}><T>emp_order_sum</T>: {numberFormat(totalPrice, 'UZS')}</div>
          <div className={classes.summary}><T>emp_order_paid</T>: {numberFormat(totalPaid, 'UZS')}</div>
        </div>
        <div className={classes.buttons}>
          {status === 'requested' &&
          <Button
            text={'button_cancel'}
            className={classes.button}
            type={'medium'}
            color={REGRET}
          />}

          {(status === 'active' || status === 'requested') &&
          <Button
            text={'button_emp_contract'}
            className={classes.button}
            type={'medium'}
            color={APPEAL}
            onClick={onRequestContract}
            loading={contractLoading}
          />}

          {status === 'cancelled' &&
          <Button
            text={'button_emp_reorder'}
            className={classes.button}
            type={'medium'}
            color={APPEAL}
          />}
        </div>
      </div>
    </Dialog>
  )
}

OrderDetails.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  detailData: PropTypes.object.isRequired,
  onRequestContract: PropTypes.func,
  statusText: PropTypes.object,
  contractLoading: PropTypes.bool,
  getStatusClassNames: PropTypes.func
}

export default withStyles(OrderDetails)
