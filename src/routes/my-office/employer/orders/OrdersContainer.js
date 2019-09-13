import fp from 'lodash/fp'
import {
  compose, createEventHandler,
  mapPropsStream
} from 'recompose'
import { connect } from 'react-redux'
import withHistory from 'helpers/withHistory'
import caughtCancel from 'helpers/caughtCancel'
import toast from 'helpers/toast'
import { getItemStateData, getStateData, getStateLoading } from 'helpers/get'
import excludeKeys from 'helpers/excludeKeys'
import {
  orderListFetch,
  orderItemFetch,
  orderRequestContractAction
} from 'routes/action-common/order'
import Orders from './Orders'

const mapStateToProps = state => ({
  ...getStateData('order.list', 'orders', state),
  ...getItemStateData('order.item', 'orders', state),
  ...getStateLoading('order.contract', 'contract', state)
})
const getOrderIdFromHistory = fp.get(['history', 'location', 'state', 'order'])

export default compose(
  withHistory,
  connect(mapStateToProps, {
    orderListFetch,
    orderItemFetch,
    orderRequestContractAction
  }),
  mapPropsStream(props$ => {
    props$
      .distinctUntilChanged(null, ({ ordersFilter }) => ordersFilter.filterRequest())
      .subscribe(({ ordersFilter, ...props }) => {
        props.orderListFetch(ordersFilter.getParams())
          .catch(caughtCancel)
      })
    props$
      .distinctUntilChanged(null, getOrderIdFromHistory)
      .filter(getOrderIdFromHistory)
      .subscribe((props) => {
        const orderId = getOrderIdFromHistory(props)
        props.orderItemFetch(orderId)
      })

    const { handler: onOpenOrderDetail, stream: onOpenOrderDetail$ } = createEventHandler()
    const { handler: onCloseOrderDetail, stream: onCloseOrderDetail$ } = createEventHandler()
    const { handler: onRequestContract, stream: onRequestContract$ } = createEventHandler()

    onOpenOrderDetail$
      .withLatestFrom(props$)
      .subscribe(([orderId, props]) => {
        const pathname = fp.get(['history', 'location', 'pathname'])
        props.history.replace(pathname, { order: orderId })
      })

    onCloseOrderDetail$
      .withLatestFrom(props$)
      .subscribe(([, props]) => {
        const pathname = fp.get(['history', 'location', 'pathname'])
        props.history.replace(pathname)
      })

    onRequestContract$
      .withLatestFrom(props$)
      .subscribe(([, props]) => {
        const orderId = getOrderIdFromHistory(props)
        props.orderRequestContractAction(orderId)
          .then(() => toast({
            title: 'Отправлено',
            message: `Вы запросили договор на заказ №${orderId}`
          }))
      })

    return props$
      .combineLatest(props => {
        const detailHandlers = {
          openOrderDetail: getOrderIdFromHistory(props),
          onOpenOrderDetail,
          onCloseOrderDetail,
          onRequestContract
        }
        return {
          ...props,
          detailHandlers
        }
      })
  }),
  excludeKeys([
    'orderListFetch',
    'orderItemFetch',
    'orderRequestContractAction'
  ])
)(Orders)
