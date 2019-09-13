import fp from 'lodash/fp'
import * as sprintf from 'sprintf'
import { connect } from 'react-redux'
import {
  compose,
  mapPropsStream,
  pure,
  createEventHandler
} from 'recompose'
import {
  APPLICANT_ITEM_URL,
  RESUME_EDIT_VIEW
} from 'constants/routes'
import setGlobalLoader from 'helpers/setGlobalLoader'
import excludeKeys from 'helpers/excludeKeys'
import withHistory from 'helpers/withHistory'
import caughtCancel from 'helpers/caughtCancel'
import {
  getStateData,
  getStateLoading
} from 'helpers/get'
import {
  resumeActivate,
  resumeDeactivate,
  resumeUpdate,
  getEmployerList,
  fetchResumeList,
  fetchSearchHistory,
  fetchFavVacancies,
  fetchFavEmployers
} from './actions'
import {
  orderCreateAction,
  orderMakePaymentAction
} from 'routes/action-common/order'
import { userInfoFetch } from 'routes/user/actions'
import Applicant from './components/Applicant'
import {
  activateServicesAction,
  promoteApplicantResumeAction
} from 'routes/services/actions'

const FIRST = 1
const resumeSwitcher = {
  active: { isActive: true },
  archive: { isActive: false },
  temp: { isTemp: true, isActive: false }
}
const mapDispatchToProps = {
  getEmployerList,
  resumeActivate,
  resumeUpdate,
  resumeDeactivate,
  fetchResumeList,
  fetchSearchHistory,
  fetchFavVacancies,
  fetchFavEmployers,
  setGlobalLoader,
  userInfoFetch,
  orderCreateAction,
  orderMakePaymentAction,
  activateServicesAction
}
const mapStateToProps = (state) => {
  return {
    ...getStateData('resume.list', 'resume', state, true),
    ...getStateData('searchHistory', 'search', state),
    ...getStateData('employer.list', 'employer', state, true, '10'),
    ...getStateData('applicant.favVacancies', 'favVacancy', state),
    ...getStateData('applicant.favEmployers', 'favEmployer', state),
    ...getStateLoading('resume.activate', 'activate', state),
    ...getStateLoading('resume.updateDate', 'updateDate', state),
    ...getStateLoading('resume.deactivate', 'deactivate', state),
    userData: fp.get('user.data', state)
  }
}

const resumeListParams = props => {
  const filter = fp.get('resumeFilter', props)
  const switcher = filter.getParam('switcher') || 'active'
  return fp.get(switcher, resumeSwitcher)
}

export default compose(
  withHistory,
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    props$
      .filter(fp.flow(fp.get('params.child'), fp.isEqual('resume')))
      .distinctUntilChanged(null, props => {
        const filter = fp.get('resumeFilter', props)
        return filter.getParam('switcher')
      })
      .subscribe(props => {
        return props.fetchResumeList(resumeListParams(props))
      })

    props$
      .filter(fp.flow(fp.get('params.child'), fp.isEqual('history')))
      .take(FIRST)
      .subscribe(props => {
        props.fetchSearchHistory()
          .catch(caughtCancel)
      })

    props$
      .distinctUntilChanged(null, fp.get('params.child'))
      .filter(fp.flow(fp.get('params.child'), fp.isEqual('fav')))
      .subscribe(props => {
        props.fetchFavVacancies()
          .catch(caughtCancel)
        props.fetchFavEmployers()
          .catch(caughtCancel)
      })

    const { handler: onTabChange, stream: onTabChange$ } = createEventHandler()
    const { handler: onResumeActivate, stream: onResumeActivate$ } = createEventHandler()
    const { handler: onResumeUpdate, stream: onResumeUpdate$ } = createEventHandler()
    const { handler: onResumeDeactivate, stream: onResumeDeactivate$ } = createEventHandler()
    const { handler: onResumeEdit, stream: onResumeEdit$ } = createEventHandler()
    const { handler: onOpenPromote, stream: onOpenPromote$ } = createEventHandler()
    const { handler: onClosePromote, stream: onClosePromote$ } = createEventHandler()
    const { handler: onPromoteResume, stream: onPromoteResume$ } = createEventHandler()

    onTabChange$
      .withLatestFrom(props$)
      .subscribe(([value, { history, ...p }]) => {
        return history.replace(sprintf(APPLICANT_ITEM_URL, value))
      })

    onResumeEdit$
      .withLatestFrom(props$)
      .subscribe(([id, { history, ...p }]) => {
        return history.push(sprintf(RESUME_EDIT_VIEW, id, 'view'))
      })

    onResumeActivate$
      .withLatestFrom(props$)
      .subscribe(([id, props]) => {
        props.setGlobalLoader(true)
        return props.resumeActivate(id)
          .then(() => props.fetchResumeList(resumeListParams(props)))
          .then(() => props.setGlobalLoader(false))
          .catch(caughtCancel)
      })

    onResumeDeactivate$
      .withLatestFrom(props$)
      .subscribe(([id, props]) => {
        props.setGlobalLoader(true)
        return props.resumeDeactivate(id)
          .then(() => props.fetchResumeList(resumeListParams(props)))
          .then(() => props.setGlobalLoader(false))
          .catch(caughtCancel)
      })

    onResumeUpdate$
      .withLatestFrom(props$)
      .subscribe(([id, props]) => {
        return props.resumeUpdate(id)
          .then(() => props.fetchResumeList(resumeListParams(props)))
          .catch(caughtCancel)
      })

    onOpenPromote$
      .withLatestFrom(props$)
      .subscribe(([resume, { history, pathname }]) => {
        history.replace(pathname, { promote: resume })
      })

    onClosePromote$
      .withLatestFrom(props$)
      .subscribe(([, { history, pathname }]) => {
        history.replace(pathname, { promote: null })
      })

    onPromoteResume$
      .withLatestFrom(props$)
      .subscribe(([services, { history, ...props }]) => {
        const resume = fp.get(['location', 'state', 'promote'], history)
        return promoteApplicantResumeAction({
          props,
          services,
          resume,
          callBack: onClosePromote
        })
      })

    return props$
      .combineLatest(props => {
        const resumeData = fp.get('resumeList.data', props)
        const promoteData = {
          open: Boolean(fp.get(['history', 'location', 'state', 'promote'], props)),
          onOpenPromote,
          onClosePromote,
          onPromoteResume
        }

        return {
          ...props,
          resumeData,
          promoteData,
          onResumeUpdate,
          onTabChange,
          onResumeActivate,
          onResumeDeactivate,
          onResumeEdit
        }
      })
  }),
  excludeKeys([
    'setGlobalLoader',
    'resumeUpdate',
    'getEmployerList',
    'getVacancyList',
    'resumeActivate',
    'resumeDeactivate',
    'fetchResumeList',
    'fetchSearchHistory',
    'fetchFavVacancies',
    'fetchFavEmployers',
    'fetchGuestList'
  ]),
  pure
)(Applicant)
