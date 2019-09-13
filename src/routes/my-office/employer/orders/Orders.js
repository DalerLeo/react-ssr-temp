import fp from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { animationStyle, crossBrowserify } from 'constants/styles'
import numberFormat from 'helpers/numberFormat'
import dateFormat from 'helpers/dateFormat'
import t from 'helpers/translate'
import Container from 'components/Container'
import Title from 'components/Title'
import T from 'components/T'
import TW from 'components/TW'
import { Table, TableRow } from 'components/Table'
import Pagination from 'components/Pagination'
import OrderDetails from './OrderDetails'

const withStyles = injectSheet({
  status: {
    ...crossBrowserify('borderRadius', '4px'),
    border: '1px solid transparent',
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '22px',
    padding: '0 12px',
    textAlign: 'center',
    width: '100px'
  },
  requested: {
    border: '1px solid',
    color: '#8798AD'
  },
  active: {
    background: '#FFD367',
    color: 'black'
  },
  completed: {
    background: '#AAB6C5',
    color: 'white'
  },
  cancelled: {
    background: '#F46090',
    color: 'white'
  }
})

const Orders = props => {
  const {
    classes,
    ordersDetail,
    ordersFilter,
    ordersList,
    detailHandlers,
    contractLoading
  } = props

  const currency = 'UZS'
  const statusText = {
    requested: 'emp_stat_wait',
    active: 'emp_stat_active',
    completed: 'emp_stat_done',
    cancelled: 'emp_stat_canceled'
  }

  const getStatusClassNames = (status) => ({
    [classes.status]: true,
    [classes[status]]: true
  })

  const loading = fp.get('loading', ordersList)
  const list = fp.map(item => {
    const id = fp.get('id', item)
    const createdDate = fp.get('createdDate', item)
    const totalPrice = fp.get('totalPrice', item)
    const totalBalance = fp.get('totalBalance', item)
    const totalPaid = totalPrice - totalBalance
    const status = fp.get('status', item)

    const statusOutput = (
      <span className={classNames(getStatusClassNames(status))}>
        <T>{fp.get(status, statusText)}</T>
      </span>
    )
    const onClickOrder = status !== 'completed'
      ? () => detailHandlers.onOpenOrderDetail(id)
      : null

    return (
      <TableRow
        key={id}
        columns={[
          { size: 3, content: id },
          { size: 4, content: dateFormat(createdDate), right: true },
          { size: 5, content: numberFormat(totalPrice, currency), right: true },
          { size: 4, content: numberFormat(totalPaid, currency), right: true },
          { size: 4, content: numberFormat(totalBalance, currency), right: true },
          { size: 4, content: statusOutput, right: true }
        ]}
        onClick={onClickOrder}
      />
    )
  }, fp.get('data', ordersList))

  return (
    <Container>
      <div className={classes.wrapper} style={animationStyle}>
        <Title isStatic={true} isProfile={true} text={'menu_emp_orders'}/>
        <TW>
          {lang => (
            <Table
              header={[
                { size: 3, title: t('emp_order_number', lang) },
                { size: 4, title: t('emp_order_date', lang), right: true },
                { size: 5, title: t('emp_order_sum', lang), right: true },
                { size: 4, title: t('emp_order_paid', lang), right: true },
                { size: 4, title: t('emp_order_rest', lang), right: true },
                { size: 4, title: t('emp_status_title', lang), right: true }
              ]}
              list={list}
              loading={loading}
            />
          )}
        </TW>
        <Pagination filter={ordersFilter} smooth={true}/>
      </div>

      <OrderDetails
        open={Boolean(detailHandlers.openOrderDetail)}
        handleClose={detailHandlers.onCloseOrderDetail}
        onRequestContract={detailHandlers.onRequestContract}
        detailData={ordersDetail}
        statusText={statusText}
        contractLoading={contractLoading}
        getStatusClassNames={getStatusClassNames}
      />
    </Container>
  )
}

Orders.propTypes = {
  classes: PropTypes.object,
  ordersFilter: PropTypes.object.isRequired,
  ordersList: PropTypes.object.isRequired,
  detailHandlers: PropTypes.object,
  ordersDetail: PropTypes.object,
  contractLoading: PropTypes.bool
}

export default withStyles(Orders)
