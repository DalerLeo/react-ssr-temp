import fp from 'lodash/fp'
import {
  compose,
  mapPropsStream,
  pure,
  createEventHandler
} from 'recompose'
import setGlobalNotify from 'helpers/setGlobalNotify'
import setGlobalLoader from 'helpers/setGlobalLoader'
import { connect } from 'react-redux'
import Employer from './components/Employer'
import { EMPLOYER_ITEM_URL } from 'constants/routes'
import sprintf from 'sprintf'
import withHistory from 'helpers/withHistory'
import {
  getStateData,
  getItemStateData
} from 'helpers/get'
import caughtCancel from 'helpers/caughtCancel'
import {
  fetchSearchHistory,
  vacancyListFetch,
  employerStatGeneralFetch,
  employerStaffListFetch,
  employerStaffDeleteAction,
  employerStatViewsFetch,
  fetchAppealedCompanies,
  getEmployerGuests
} from './actions'
import {
  orderListFetch,
  orderItemFetch
} from 'routes/action-common/order'

const mapStateToProps = (state) => {
  return {
    userData: fp.get('user.data', state) || {},
    notifications: fp.get('notifications.data', state),
    employerAdmin: fp.get('employerStaff.list.data.employer', state) || {},
    query: fp.get('router.queries', state) || {},
    ...getItemStateData('employer.statGeneral', 'generalStats', state),
    ...getItemStateData('employer.statViews', 'viewsStats', state),
    ...getStateData('resume.activeList', 'resume', state, true),
    ...getStateData('searchHistory', 'search', state),
    ...getStateData('employerStaff.list', 'employerStaff', state)
  }
}
const FIRST = 1
const mapDispatchToProps = {
  setGlobalNotify,
  setGlobalLoader,
  vacancyListFetch,
  employerStatGeneralFetch,
  fetchSearchHistory,
  employerStaffListFetch,
  employerStaffDeleteAction,
  orderListFetch,
  orderItemFetch,
  employerStatViewsFetch,
  fetchAppealedCompanies,
  getEmployerGuests
}

export default compose(
  withHistory,
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    props$
      .first()
      .subscribe(props => {
        props.employerStatGeneralFetch()
        props.employerStatViewsFetch()
      })

    props$
      .filter(fp.flow(fp.get('params.child'), fp.isEqual('history')))
      .take(FIRST)
      .subscribe(props => {
        props.fetchSearchHistory()
          .catch(caughtCancel)
      })

    props$
      .filter(fp.flow(fp.get('params.child'), fp.isEqual('employer-staff')))
      .take(FIRST)
      .subscribe(props => {
        props.employerStaffListFetch()
          .catch(caughtCancel)
      })

    const { handler: onTabChange, stream: onTabChange$ } = createEventHandler()
    const { handler: onDeleteStaff, stream: onDeleteStaff$ } = createEventHandler()

    onTabChange$
      .withLatestFrom(props$)
      .subscribe(([value, { history }]) => {
        return history.push(sprintf(EMPLOYER_ITEM_URL, value))
      })

    onDeleteStaff$
      .withLatestFrom(props$)
      .subscribe(([staffId, props]) => {
        props.employerStaffDeleteAction(staffId)
          .then(() => {
            props.employerStaffListFetch()
          })
          .catch(caughtCancel)
      })

    return props$
      .combineLatest(props => {
        const {
          employerAdmin,
          employerStaffList,
          ...rest
        } = props

        return {
          ...rest,
          onTabChange,
          onDeleteStaff,
          employerStaffList: { ...employerStaffList, employerAdmin }
        }
      })
  }),
  pure
)(Employer)

