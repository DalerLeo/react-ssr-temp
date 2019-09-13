import {
  compose,
  createEventHandler,
  mapPropsStream
} from 'recompose'
import { connect } from 'react-redux'
import withHistory from 'helpers/withHistory'
import { getStateData } from 'helpers/get'
import excludeKeys from 'helpers/excludeKeys'
import { userActiveServicesList } from 'routes/user/actions'
import { activeServicesFetch as userUnusedServicesFetch } from 'routes/vacancy-create/actions'
import Services from './Services'

const mapStateToProps = state => ({
  ...getStateData('userServices.list', 'services', state),
  ...getStateData('userServices.unused', 'unusedServices', state)
})

export default compose(
  withHistory,
  connect(mapStateToProps, {
    userActiveServicesList,
    userUnusedServicesFetch
  }),
  mapPropsStream(props$ => {
    props$
      .distinctUntilChanged(null, ({ servicesFilter }) => servicesFilter.filterRequest())
      .subscribe(({ servicesFilter, ...props }) => {
        const params = { ...servicesFilter.getParams(), type: 'active' }
        props.userActiveServicesList(params)
        props.userUnusedServicesFetch()
      })

    const { handler: onOpenOrderDetail, stream: onOpenOrderDetail$ } = createEventHandler()

    return props$
      .map(props => {
        return props
      })
  }),
  excludeKeys([
    'userActiveServicesList',
    'userUnusedServicesFetch'
  ])
)(Services)
