import {
  compose, createEventHandler,
  mapPropsStream
} from 'recompose'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import withHistory from 'helpers/withHistory'
import {
  getStateData,
  isEmployer,
  isApplicant
} from 'helpers/get'
import excludeKeys from 'helpers/excludeKeys'
import caughtCancel from 'helpers/caughtCancel'
import { getEmployerList } from 'routes/user/actions'
import { getChatList } from 'routes/action-common/chat'
import Vip from './Vip'

const mapStateToProps = state => ({
  ...getStateData('employer.list', 'employer', state, true),
  ...getStateData('chat.front', 'chat', state, false),
  vipForm: getFormValues('VIPForm')(state)
})

export default compose(
  withHistory,
  connect(mapStateToProps, {
    getEmployerList,
    getChatList
  }),
  mapPropsStream(props$ => {
    const { handler: onVIPSearch, stream: onVIPSearch$ } = createEventHandler()

    props$
      .first()
      .subscribe(props => {
        if (isEmployer(props.userData)) {
          props.getChatList()
        }
      })

    props$
      .filter(props => isApplicant(props.userData))
      .distinctUntilChanged(null, props => props.employerFilter.filterRequest())
      .subscribe(props => {
        props.getEmployerList(props.employerFilter)
          .catch(caughtCancel)
      })

    onVIPSearch$
      .withLatestFrom(props$)
      .subscribe(([value, { history, vipForm, employerFilter, pathname }]) => {
        const defaultVal = { search: '' }
        const search = employerFilter.getStringParams({ ...defaultVal, ...vipForm })
        return history.replace({ pathname, search })
      })

    return props$
      .map(props => {
        const { employerFilter } = props
        const initialValues = {
          search: employerFilter.getParam('search'),
          type: 'company'
        }
        return {
          ...props,
          onVIPSearch,
          initialValues
        }
      })
  }),
  excludeKeys([
    'getEmployerList',
    'getChatList'
  ])
)(Vip)
