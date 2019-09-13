import fp from 'lodash/fp'
import { getFormValues } from 'redux-form'
import {
  compose,
  mapPropsStream,
  createEventHandler
} from 'recompose'
import { connect } from 'react-redux'
import * as sprintf from 'sprintf'
import { SERVICE_ITEM_URL } from 'constants/routes'
import excludeKeys from 'helpers/excludeKeys'
import withHistory from 'helpers/withHistory'
import { getStateData, getStateLoading, getItemStateData } from 'helpers/get'
import formValidate from 'helpers/formValidate'
import {
  getVacancyServicesDiscounts,
  getEmployerServicesList,
  getDatabaseAccessList,
  getDatabaseAccessItem,
  getVipPacketList,
  fillingBalanceAction
} from './actions'
import { userInfoFetch } from 'routes/user/actions'
import {
  setItemsToCartAction,
  removeCartItemAction,
  clearCartAction
} from 'routes/action-common/cart'
import {
  orderCreateAction,
  orderMakePaymentAction,
  onOrderCreateAction
} from 'routes/action-common/order'
import { getSearchResults } from 'routes/results/actions'
import Services from './components/Services'

const mapStateToProps = state => {
  return {
    ...getItemStateData('service.discounts', 'discounts', state),
    ...getStateData('service.employer', 'services', state, false),
    ...getStateData('cart', 'cart', state, false),
    ...getStateData('service.databaseAccess', 'databaseAccess', state, false),
    ...getItemStateData('service.databasePeriod', 'databasePeriod', state),
    ...getStateData('service.vipPacket', 'vipPacket', state, false),
    ...getStateLoading('service.fillBalance', 'fillBalance', state),
    ...getStateLoading('order.create', 'orderCreate', state),
    formValues: getFormValues('ServicesForm')(state),
    searchFaceted: fp.get(['searchList', 'data', 'faceted', 'industries'], state) || {}
  }
}

const mapDispatchToProps = {
  formValidate,
  getVacancyServicesDiscounts,
  getEmployerServicesList,
  getDatabaseAccessList,
  getDatabaseAccessItem,
  getVipPacketList,
  fillingBalanceAction,
  userInfoFetch,
  setItemsToCartAction,
  removeCartItemAction,
  clearCartAction,
  orderCreateAction,
  orderMakePaymentAction,
  getSearchResults
}

export default compose(
  withHistory,
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    const { handler: onTabChange, stream: onTabChange$ } = createEventHandler()
    const { handler: onFillBalance, stream: onFillBalance$ } = createEventHandler()
    const { handler: onOrderCreate, stream: onOrderCreate$ } = createEventHandler()

    props$
      .first()
      .subscribe(props => props.getVacancyServicesDiscounts())

    props$
      .distinctUntilChanged(null, fp.get('params.child'))
      .filter(fp.get('params.child'))
      .subscribe(props => {
        const { params: { child } } = props
        switch (child) {
          case 'vacancy': return props.getEmployerServicesList()
          case 'database': {
            props.getSearchResults({
              type: 'resume'
            })
            return props.getDatabaseAccessList()
          }
          case 'vip': return props.getVipPacketList()
          default: return null
        }
      })

    props$
      .distinctUntilChanged(null, fp.get('formValues.databaseSphere'))
      .filter(fp.get('formValues.databaseSphere'))
      .subscribe(({ formValues, ...props }) => {
        const spheres = fp.flow(
          fp.get('databaseSphere'),
          fp.join('-')
        )(formValues)
        console.warn(spheres)
        props.getDatabaseAccessItem(spheres)
      })

    onTabChange$
      .withLatestFrom(props$)
      .subscribe(([value, { history, pathname }]) => {
        return history.replace(sprintf(SERVICE_ITEM_URL, value))
      })

    onFillBalance$
      .withLatestFrom(props$)
      .subscribe(([value, { formValues, ...props }]) => {
        const { paymentType } = value
        const amount = fp.get('amount', formValues)
        return props.fillingBalanceAction(paymentType, amount)
          .then(response => {
            const paymenturl = fp.get('value.paymentUrl', response)
            window.open(paymenturl, '_blank')
          })
          .catch(error => props.formValidate('ServicesForm', error))
      })

    onOrderCreate$
      .withLatestFrom(props$)
      .subscribe(([services, props]) => {
        return onOrderCreateAction(props, services)
      })

    return props$.combineLatest(props => ({
      ...props,
      onTabChange,
      onFillBalance,
      onOrderCreate,
      initialValues: {}
    }))
  }),
  excludeKeys([
    'getVacancyServicesDiscounts',
    'getEmployerServicesList',
    'getDatabaseAccessList',
    'getDatabaseAccessItem',
    'getVipPacketList',
    'fillingBalanceAction',
    'userInfoFetch',
    'orderCreateAction',
    'orderMakePaymentAction',
    'getSearchResults'
  ])
)(Services)

